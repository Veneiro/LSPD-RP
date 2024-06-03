window.onload = function() {
    var select = document.getElementById('mySelect');
    var text = document.getElementById('myText');

    select.addEventListener('change', function() {
        var value = select.value;

        fetch('procedimientos/' + value + '.md')
            .then(response => response.text())
            .then(content => {
                text.innerHTML = marked(content);
            });
    });
}