document.getElementById("createEventBtn").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // SweetAlert confirmation dialog
    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to create this event?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, create it!',
        cancelButtonText: 'No, cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // If confirmed, submit the form
            document.getElementById("eventForm").submit();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const imageUpload = document.getElementById("imageUpload");
    const mainImage = document.getElementById("mainImage");
    const imageThumbnails = document.getElementById("imageThumbnails");

    imageUpload.addEventListener("change", function () {
        imageThumbnails.innerHTML = ""; // Clear existing thumbnails
        const files = imageUpload.files;

        if (files.length > 0) {
            const reader = new FileReader();

            reader.onload = function (e) {
                mainImage.src = e.target.result; // Set main image preview
            };

            reader.readAsDataURL(files[0]); // Read the first file

            // Generate thumbnails for all selected images
            Array.from(files).forEach((file) => {
                const thumbReader = new FileReader();
                thumbReader.onload = function (e) {
                    const imgElement = document.createElement("img");
                    imgElement.src = e.target.result;
                    imageThumbnails.appendChild(imgElement);
                };
                thumbReader.readAsDataURL(file);
            });
        }
    });
});


window.onload = function() {
    const messages = document.getElementById('flash-messages');
    if (messages) {
        const messageList = messages.children;
        for (let i = 0; i < messageList.length; i++) {
            const message = messageList[i].innerHTML;
            const category = messageList[i].classList;

            // Customize alert based on category (success, danger, etc.)
            if (category.contains('success')) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: message,
                    timer: 3000,
                    showConfirmButton: true,
                });
            } else if (category.contains('danger')) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: message,
                    timer: 3000,
                    showConfirmButton: true,
                });
            } else if (category.contains('info')) {
                Swal.fire({
                    icon: 'info',
                    title: 'Information',
                    text: message,
                    timer: 3000,
                    showConfirmButton: true,
                });
            } else if (category.contains('warning')) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Warning',
                    text: message,
                    timer: 3000,
                    showConfirmButton: true,
                });
            } else {
                Swal.fire({
                    icon: 'question',
                    title: 'Message',
                    text: message,
                    timer: 3000,
                    showConfirmButton: true,
                });
            }
        }
    }

};