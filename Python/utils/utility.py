import random

def make_id(length):
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    result = ''.join(random.choice(characters) for _ in range(length))
    return result