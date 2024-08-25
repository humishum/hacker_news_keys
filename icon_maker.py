# Thanks ChatGPT
from PIL import Image


# Function to replace white with transparency and center the image
def process_image(image_path, size):
    # Open the image and convert it to have an alpha channel
    image = Image.open(image_path).convert("RGBA")

    # Replace white with transparency
    datas = image.getdata()
    new_data = []
    for item in datas:
        # Check if the pixel is white (you can adjust the tolerance here)
        if item[:3] == (255, 255, 255):
            new_data.append((255, 255, 255, 0))  # Make it transparent
        else:
            new_data.append(item)
    image.putdata(new_data)

    # Calculate the maximum dimension (width or height) to make the image square
    max_dim = max(image.size)

    # Create a square canvas with a transparent background
    centered_image = Image.new("RGBA", (max_dim, max_dim), (255, 255, 255, 0))

    # Calculate the position to paste the original image
    position = ((max_dim - image.width) // 2, (max_dim - image.height) // 2)
    centered_image.paste(image, position)

    # Resize the centered image to the desired size
    resized_image = centered_image.resize((size, size), Image.Resampling.LANCZOS)

    return resized_image


# Define file paths
input_path = "original_icon.png"  # Replace with your image path
output_paths = {
    16: "icon16.png",
    48: "icon48.png",
    128: "icon128.png",
}

# Process the image for each required size and save it
for size, output_path in output_paths.items():
    final_image = process_image(input_path, size)
    final_image.save(output_path)

print("Icons have been created and saved successfully.")
