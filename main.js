console.log("script loaded");

$(document).ready(function() {
  var colorPalette = ['000000', 'FF9966', '6699FF', '99FF66', 'CC0000', '00CC00', '0000CC', '333333', '0066FF', 'FFFFFF'];
  var forePalette = $('.fore-palette');
  var backPalette = $('.back-palette');

  for (var i = 0; i < colorPalette.length; i++) {
    forePalette.append('<a href="#" data-command="forecolor" data-value="' + '#' + colorPalette[i] + '" style="background-color:' + '#' + colorPalette[i] + ';" class="palette-item"></a>');
    backPalette.append('<a href="#" data-command="backcolor" data-value="' + '#' + colorPalette[i] + '" style="background-color:' + '#' + colorPalette[i] + ';" class="palette-item"></a>');
  }

  $('.toolbar a').click(function(e) {
    e.preventDefault();
    var command = $(this).data('command');
    if (command == 'h1' || command == 'h2' || command == 'p') {
      document.execCommand('formatBlock', false, command);
    }
    if (command == 'forecolor' || command == 'backcolor') {
      document.execCommand($(this).data('command'), false, $(this).data('value'));
    }
    if (command == 'createlink' || command == 'insertimage') {
      url = prompt('Enter the link here: ', 'http:\/\/');
      document.execCommand($(this).data('command'), false, url);
    } else {
      document.execCommand($(this).data('command'), false, null);
    }
  });

  $(document).on("click", "#editor img", function(ev) {
    const range = new Range();
    range.selectNode(ev.target);
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(range);
  });

  /*const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

  function switchTheme(e) {
      if (e.target.checked) {
          document.documentElement.setAttribute('data-theme', 'dark');
      }
      else {
          document.documentElement.setAttribute('data-theme', 'light');
      }    
  }

  toggleSwitch.addEventListener('change', switchTheme, false);*/

  console.log(localStorage.getItem('theme'));
  let dark = (localStorage.getItem('theme') == "dark") ? true : false;

  function updateThemeState() {
    document.documentElement.setAttribute('data-theme', dark ? "dark" : "light");
    $("#theme-switch-wrapper i").attr("class", "fa fa-" + (dark ? "sun-o" : "moon-o"));
    localStorage.setItem('theme', dark ? "dark" : "light");
  }

  $("#theme-switch-wrapper i").click(function(ev) {
    dark = !$("#theme-switch-wrapper input").is(':checked');
    updateThemeState();
  });

  updateThemeState();
});
