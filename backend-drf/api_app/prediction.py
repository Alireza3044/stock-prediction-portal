import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import yfinance as yf
from datetime import datetime
from django.conf import settings
from keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error, r2_score
from math import floor

def get_stock_price_data(ticker: str) -> pd.DataFrame:
    now = datetime.now()
    start = datetime(now.year - 10, now.month, now.day)

    df = yf.download(ticker, start, now)
    if df.empty:
        raise ValueError("No data found for the given ticker.")

    df.columns = df.columns.droplevel(1)
    df.columns.names = ['']
    df.reset_index(inplace=True)
    
    data = pd.DataFrame(df.Close)
    data["ma100"] = data.Close.rolling(100).mean()
    data["ma200"] = data.Close.rolling(200).mean()
    
    return data


def plot_and_get_image_path(ticker, data, colors, plot_labels):
    plt.switch_backend('AGG')
    plt.figure(figsize=(12, 6))
    for d, color, label in zip(data, colors, plot_labels):
        plt.plot(d, color, label=label)
    plt.xlabel("Day")
    plt.ylabel("Price")
    plt.title(f"Ticker: {ticker}")
    plt.legend()

    plot_labels_text = "_".join(plot_labels)
    plot_image_name = f"{ticker}_{plot_labels_text}_plot.png".replace(" ", "_")
    plot_image_path = settings.MEDIA_ROOT / plot_image_name
    plt.savefig(plot_image_path)
    plt.close()

    return settings.MEDIA_URL + plot_image_name


def evaluate(data, model_path):
    # Data preprocessing
    data = pd.DataFrame(data)
    index = floor(len(data) * 0.7)

    test_data = data.iloc[index-100:]
    
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_test_data = scaler.fit_transform(test_data)

    x_test, y_test = [], []
    for i in range(100, scaled_test_data.shape[0]):
        x_test.append(scaled_test_data[i-100 : i])
        y_test.append(scaled_test_data[i, 0])

    x_test, y_test = np.array(x_test), np.array(y_test)
    
    # Loading and Prediction
    model = load_model(model_path)
    y_pred = model.predict(x_test)

    # Get original data
    y_test = scaler.inverse_transform(y_test.reshape(-1, 1))
    y_pred = scaler.inverse_transform(y_pred.reshape(-1, 1))

    # Evaluation
    mse = mean_squared_error(y_test, y_pred)
    rmse = mse ** 0.5
    r2 = r2_score(y_test, y_pred)
    
    return {
        "y_test": y_test,
        "y_pred": y_pred,
        "mse": f"{mse:.3f}",
        "rmse": f"{rmse:.3f}",
        "r2_score": f"{r2:.3f}"
    }
