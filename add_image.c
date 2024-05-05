#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_FILENAME_LENGTH 100
#define MAX_ALT_LENGTH 100
#define MAX_IMAGES 100

// Structure to represent an image
typedef struct {
    char filename[MAX_FILENAME_LENGTH];
    char alt[MAX_ALT_LENGTH];
} Image;

int main() {
    Image images[MAX_IMAGES];
    int numImages = 0;

    FILE *file;

    // Read existing image data from imgs.json
    file = fopen("imgs.json", "r");
    if (file) {
        char line[256];
        while (fgets(line, sizeof(line), file)) {
            sscanf(line, "{\"filename\": \"%[^\"]\", \"alt\": \"%[^\"]\"}",
                   images[numImages].filename, images[numImages].alt);
            numImages++;
        }
        fclose(file);
    }

    // Add a new image
    char newFilename[MAX_FILENAME_LENGTH];
    char newAlt[MAX_ALT_LENGTH];

    printf("Enter the filename of the new image: ");
    scanf("%s", newFilename);
    printf("Enter the alt text for the new image: ");
    scanf("%s", newAlt);

    strncpy(images[numImages].filename, newFilename, MAX_FILENAME_LENGTH);
    strncpy(images[numImages].alt, newAlt, MAX_ALT_LENGTH);
    numImages++;

    // Write updated image data to imgs.json
    file = fopen("imgs.json", "w");
    if (file) {
        for (int i = 0; i < numImages; i++) {
            fprintf(file, "{\"filename\": \"%s\", \"alt\": \"%s\"}\n",
                    images[i].filename, images[i].alt);
        }
        fclose(file);
    } else {
        printf("Error: Could not open file for writing.\n");
        return 1;
    }

    printf("Image added successfully!\n");

    return 0;
}
