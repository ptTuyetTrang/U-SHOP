document.addEventListener('DOMContentLoaded', function () {
    // Toggle password visibility
    function togglePasswordVisibility(buttonId, inputId) {
        document.getElementById(buttonId).addEventListener('click', function () {
            const passwordInput = document.getElementById(inputId);
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    togglePasswordVisibility('togglePassword', 'password');
    togglePasswordVisibility('toggleConfirmPassword', 'confirmPassword');

    });
    document.getElementById('form-1').addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form

        // Hiển thị thông báo thành công
        document.getElementById('successAlert').style.display = 'block';

        // Ẩn thông báo sau vài giây nếu muốn
        setTimeout(function() {
            document.getElementById('successAlert').style.display = 'none';
        }, 5000); // Ẩn sau 5 giây
    });

