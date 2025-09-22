document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const locationInput = document.getElementById('loc');
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const typeInputs = document.querySelectorAll('input[name="type"]');
    const humiditySelect = document.getElementById('humidity');
    const climateSelect = document.getElementById('climate');
    const altitudeInput = document.getElementById('altitude');

    let errorMessages = {};

    function createErrorElement(inputId) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '5px';
        errorDiv.id = inputId + '-error';
        return errorDiv;
    }

    function showError(input, message) {
        const errorId = input.id + '-error';
        let errorDiv = document.getElementById(errorId);

        if (!errorDiv) {
            errorDiv = createErrorElement(input.id);
            input.parentNode.appendChild(errorDiv);
        }

        errorDiv.textContent = message;
        input.style.borderColor = 'red';
    }

    function clearError(input) {
        const errorId = input.id + '-error';
        const errorDiv = document.getElementById(errorId);

        if (errorDiv) {
            errorDiv.remove();
        }

        input.style.borderColor = '';
    }

    function validateLocation() {
        const value = locationInput.value.trim();
        if (value === '') {
            showError(locationInput, 'La località è obbligatoria.');
            return false;
        }
        if (value.length < 2) {
            showError(locationInput, 'La località deve contenere almeno 2 caratteri.');
            return false;
        }
        clearError(locationInput);
        return true;
    }

    function validateDate() {
        const value = dateInput.value;
        if (value === '') {
            showError(dateInput, 'La data è obbligatoria.');
            return false;
        }

        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
            showError(dateInput, 'La data non può essere futura.');
            return false;
        }

        clearError(dateInput);
        return true;
    }

    function validateTime() {
        const value = timeInput.value;
        if (value === '') {
            showError(timeInput, 'L\'ora è obbligatoria.');
            return false;
        }
        clearError(timeInput);
        return true;
    }

    function validateType() {
        let isChecked = false;
        typeInputs.forEach(function(input) {
            if (input.checked) {
                isChecked = true;
            }
        });

        if (!isChecked) {
            showError(typeInputs[0], 'Il tipo di rivelazione è obbligatorio.');
            return false;
        }

        clearError(typeInputs[0]);
        return true;
    }

    function validateHumidity() {
        const value = humiditySelect.value;
        if (value === '') {
            showError(humiditySelect, 'L\'umidità è obbligatoria.');
            return false;
        }
        clearError(humiditySelect);
        return true;
    }

    function validateClimate() {
        const value = climateSelect.value;
        if (value === '') {
            showError(climateSelect, 'Il clima attuale è obbligatorio.');
            return false;
        }
        clearError(climateSelect);
        return true;
    }

    function validateAltitude() {
        const value = altitudeInput.value.trim();
        if (value === '') {
            showError(altitudeInput, 'L\'altitudine è obbligatoria.');
            return false;
        }

        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
            showError(altitudeInput, 'L\'altitudine deve essere un numero valido.');
            return false;
        }

        if (numValue < 0) {
            showError(altitudeInput, 'L\'altitudine deve essere un numero positivo.');
            return false;
        }

        if (numValue > 10000) {
            showError(altitudeInput, 'L\'altitudine sembra troppo elevata.');
            return false;
        }

        clearError(altitudeInput);
        return true;
    }

    function validateForm() {
        let isValid = true;

        isValid &= validateLocation();
        isValid &= validateDate();
        isValid &= validateTime();
        isValid &= validateType();
        isValid &= validateHumidity();
        isValid &= validateClimate();
        isValid &= validateAltitude();

        return isValid;
    }

    if (locationInput) {
        locationInput.addEventListener('blur', validateLocation);
        locationInput.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                clearError(this);
            }
        });
    }

    if (dateInput) {
        dateInput.addEventListener('change', validateDate);
    }

    if (timeInput) {
        timeInput.addEventListener('blur', validateTime);
        timeInput.addEventListener('input', function() {
            if (this.value !== '') {
                clearError(this);
            }
        });
    }

    if (typeInputs.length > 0) {
        typeInputs.forEach(function(input) {
            input.addEventListener('change', validateType);
        });
    }

    if (humiditySelect) {
        humiditySelect.addEventListener('change', validateHumidity);
    }

    if (climateSelect) {
        climateSelect.addEventListener('change', validateClimate);
    }

    if (altitudeInput) {
        altitudeInput.addEventListener('blur', validateAltitude);
        altitudeInput.addEventListener('input', function() {
            if (this.value.trim() !== '' && !isNaN(parseFloat(this.value))) {
                clearError(this);
            }
        });
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            if (!validateForm()) {
                e.preventDefault();
                const firstError = document.querySelector('.error-message');
                if (firstError) {
                    const input = firstError.previousElementSibling;
                    if (input && input.focus) {
                        input.focus();
                    }
                }
                return false;
            }
        });
    }

    function addRealTimeValidation() {
        const inputs = [locationInput, timeInput, altitudeInput];
        inputs.forEach(function(input) {
            if (input) {
                input.addEventListener('input', function() {
                    this.style.borderColor = '';
                });
            }
        });
    }

    addRealTimeValidation();
});
