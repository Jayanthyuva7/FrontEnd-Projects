document.addEventListener('DOMContentLoaded', function() {
    const marginSlider = document.getElementById('margin');
    const borderSlider = document.getElementById('border');
    const paddingSlider = document.getElementById('padding');
    const boxExample = document.querySelector('.box-model-example');
    
    const marginValue = document.getElementById('margin-value');
    const borderValue = document.getElementById('border-value');
    const paddingValue = document.getElementById('padding-value');
    
    marginSlider.addEventListener('input', function() {
        const value = this.value + 'px';
        boxExample.style.margin = value;
        marginValue.textContent = value;
    });
    
    borderSlider.addEventListener('input', function() {
        const value = this.value + 'px';
        boxExample.style.borderWidth = value;
        borderValue.textContent = value;
    });
    
    paddingSlider.addEventListener('input', function() {
        const value = this.value + 'px';
        boxExample.style.padding = value;
        paddingValue.textContent = value;
    });
});