import cv2
import numpy as np
import base64
from cryptography.fernet import Fernet

def preprocess_fingerprint(image_path):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    _, binary = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY_INV)
    return binary

def extract_features(image):
    features = cv2.findNonZero(image)
    if features is not None:
        return np.array(features).flatten()
    return np.array([])

def generate_key(features):
    if len(features) < 32:
        features = np.pad(features, (0, 32 - len(features)), 'constant')
    key_bytes = features[:32].astype(np.uint8).tobytes()
    key_base64 = base64.urlsafe_b64encode(key_bytes)
    return key_base64.decode()

def encrypt_data(data, key):
    cipher = Fernet(key)
    encrypted = cipher.encrypt(data.encode())
    return encrypted

def decrypt_data(encrypted_data, key):
    cipher = Fernet(key)
    decrypted = cipher.decrypt(encrypted_data)
    return decrypted.decode()
