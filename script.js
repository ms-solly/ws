document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('imageGallery');
  
    // Function to fetch images from the server
    function fetchImages() {
      fetch('imgs.json')
        .then(response => response.json())
        .then(images => {
          gallery.innerHTML = ''; // Clear previous images
          images.forEach(image => {
            const img = document.createElement('img');
            img.src = image.filename;
            img.alt = image.alt;
            gallery.appendChild(img);
          });
        })
        .catch(error => console.error('Error fetching images:', error));
    }
  
    fetchImages(); // Fetch images when the page loads
  
    // Poll for new images every 5 seconds
    setInterval(fetchImages, 5000);
  });
  