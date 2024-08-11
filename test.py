import pygame
import noise
import numpy as np

# Initialize Pygame
pygame.init()

# Default settings
settings = {
    "width": 800,
    "height": 600,
    "background_color": (0, 0, 0),
    "wave_color": (0, 0, 255),
    "scale": 1,
    "speed": 2,
    "density": 2000,  # Adjust density to control wave amplitude
    "viscosity": 100  # Adjust viscosity to control wave dissipation
}

# Create the screen
screen = pygame.display.set_mode((settings["width"], settings["height"]))
pygame.display.set_caption('Water Ripples Simulation')

# Main loop
running = True
clock = pygame.time.Clock()

def generate_wave(scale, width, height):
    """Generate a 2D wave using Perlin noise."""
    wave = np.zeros((width, height), dtype=float)
    for i in range(width):
        for j in range(height):
            wave[i, j] = settings["density"] * noise.pnoise2(i * scale, j * scale, octaves=4, persistence=0.5, lacunarity=2.0, repeatx=1024, repeaty=1024, base=42)
    return wave

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Generate a new wave frame
    wave_frame = generate_wave(settings["scale"], settings["width"], settings["height"])

    # Scroll the wave horizontally
    wave_frame = np.roll(wave_frame, int(pygame.time.get_ticks() * settings["speed"]) % settings["width"], axis=0)

    # Apply viscosity to the wave
    wave_frame *= settings["viscosity"]

    # Update the screen
    screen.fill(settings["background_color"])
    for i in range(settings["width"]):
        pygame.draw.line(screen, settings["wave_color"], (i, settings["height"]), (i, settings["height"] - int(settings["height"] * wave_frame[i])), 1)

    pygame.display.flip()

    # Cap the frame rate
    clock.tick(60)

# Quit Pygame
pygame.quit()