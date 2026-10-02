import sys
from collections import Counter
try:
    from PIL import Image
except ImportError:
    print("PIL not found. Please install pillow.")
    sys.exit(1)

def rgb_to_hex(rgb):
    return '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])

def extract_colors(image_path, num_colors=50):
    try:
        img = Image.open(image_path)
        img = img.convert('RGB')
        img = img.resize((100, 100))  # Resize for speed
        
        pixels = list(img.getdata())
        counts = Counter(pixels)
        common = counts.most_common(num_colors)
        
        print(f"Top {num_colors} colors:")
        for color, count in common:
            print(f"{rgb_to_hex(color)} (count: {count})")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extract_colors.py <image_path>")
    else:
        extract_colors(sys.argv[1])
