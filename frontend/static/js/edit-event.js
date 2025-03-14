 // Show SweetAlert on "Save Changes" button click
 document.getElementById("saveBtn").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Show confirmation prompt
    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to save the changes to this event?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, save it!',
        cancelButtonText: 'No, cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // Set action to 'save' and submit the form
            document.getElementById('action').value = 'save';
            document.getElementById('editEventForm').submit();
        }
    });
});

// Show SweetAlert on "Cancel" button click
document.getElementById("cancelBtn").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default action

    // Show confirmation prompt
    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to cancel the changes?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, cancel it!',
        cancelButtonText: 'No, go back'
    }).then((result) => {
        if (result.isConfirmed) {
            // Set action to 'cancel' and submit the form
            document.getElementById('action').value = 'cancel';
            document.getElementById('editEventForm').submit();
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
