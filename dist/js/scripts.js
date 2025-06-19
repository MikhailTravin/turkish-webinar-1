document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".block-registration__form");
    const inputs = form.querySelectorAll("input[data-required]"); // Используем data-required вместо required

    function validateForm() {
        let isValid = true;

        inputs.forEach(input => {
            removeError(input);

            const value = input.value.trim();

            if (!value) {
                showError(input, input.getAttribute("data-error") || "Поле не заполнено");
                isValid = false;
            } else if (input.hasAttribute("data-type")) {
                const type = input.getAttribute("data-type");
                let errorText = "";

                switch (type) {
                    case "phone":
                        const phonePattern = /^[+]?[\d\s\-()]{7,}$/;
                        if (!phonePattern.test(value)) {
                            errorText = "Введите корректный телефон";
                        }
                        break;
                    case "email":
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailPattern.test(value)) {
                            errorText = "Введите корректный email";
                        }
                        break;
                }

                if (errorText) {
                    showError(input, errorText);
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    function showError(input, message) {
        input.classList.add("_form-error");

        const errorDiv = document.createElement("div");
        errorDiv.className = "form-error-message";
        errorDiv.textContent = message;

        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }

    function removeError(input) {
        input.classList.remove("_form-error");
        const existingError = input.parentNode.querySelector(".form-error-message");
        if (existingError) {
            existingError.remove();
        }
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Полностью отключаем стандартное поведение
        if (validateForm()) {
            this.submit(); // Можно заменить на AJAX-запрос
        }
    });

    inputs.forEach(input => {
        input.addEventListener("blur", validateForm);
        input.addEventListener("input", () => {
            removeError(input);
        });
    });
});