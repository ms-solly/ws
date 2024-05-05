document.addEventListener('DOMContentLoaded', function() {
  const gallery = document.getElementById('imageGallery');
  const uploadField = document.getElementById('fileInput');
  const imageUrlField = document.getElementById('imageUrl');

  // Function to fetch images from the server
  function fetchImages() {
    fetch('imgs.json')
      .then(response => response.json())
      .then(images => {
        gallery.innerHTML = ''; // Clear previous images
        images.forEach(image => {
          addImageToGallery(image.filename, image.alt);
        });
      })
      .catch(error => console.error('Error fetching images:', error));
  }

  fetchImages(); // Fetch images when the page loads

  // Poll for new images every 5 seconds
  setInterval(fetchImages, 5000);

  // Function to handle adding image from file input
  uploadField.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file);
      handleFileUpload(file);
      imageUrlField.value = file.name; // Show file name in upload field
    }
  });

  // Function to handle adding image from URL input
  function addImageFromUrl() {
    const imageUrl = imageUrlField.value;
    if (imageUrl) {
      console.log('Adding image from URL:', imageUrl);
      const img = new Image();
      img.onload = function() {
        console.log('Image loaded successfully');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const pngData = canvas.toDataURL('image/png');
        addImageToGallery(pngData, 'Uploaded Image');
        imageUrlField.value = ''; // Clear the URL input field
        console.log('Image added to gallery');
      };
      img.onerror = function() {
        console.error('Error loading image from URL:', imageUrl);
      };
      img.src = imageUrl;
    } else {
      console.error('Empty URL input field');
    }
  }

  // Function to handle file upload
  function handleFileUpload(file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        console.log('Image loaded from file');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const pngData = canvas.toDataURL('image/png');
        addImageToGallery(pngData, 'Uploaded Image');
      };
      img.onerror = function() {
        console.error('Error loading image from file');
      };
      img.src = e.target.result;
    };

    reader.onerror = function() {
      console.error('Error reading file');
    };

    reader.readAsDataURL(file);
  }

  // Function to add image to gallery
  function addImageToGallery(pngData, alt) {
    const img = document.createElement('img');
    img.src = pngData;
    img.alt = alt;
    gallery.appendChild(img);
  }
});
