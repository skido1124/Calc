var output = '', input = '';
var calc, point = false, negative = false;
var $output = $('.output');

var clear = function(){
  $output.trigger('update:output', 0);
  output = 0;
  refreshInput();
};

var numeric = function(val){
  if (input === '' || input === 0) {
    input = val;
  } else {
    input += String(val);
  }
  $output.trigger('update:output', input);
};

var setCalc = function(operator) {
  if (input === '' && !calc && output === '') {
    return;
  } else if (input > 0 && calc && output > 0) {
    equal();
  } else if (input > 0) {
    output = input;
    refreshInput();
  }

  calc = operator;
};

var equal = function(){
  var input1, input2, result;

  if (!calc || input === '' || output === '') {
    return;
  }

  input1 = parseFloat(output);
  input2 = parseFloat(input);

  switch (calc) {
    case 'divide':
      if (input2 === 0) {
        result = 'Error';
      } else {
        result = input1 / input2;
      }
      break;
    case 'subtract':
      result = input1 - input2;
      break;
    case 'multiply':
      result = input1 * input2;
      break;
    case 'add':
      result = input1 + input2;
      break;
    default:
      break;
  }

  result = String(result);
  if (result.length > 8) {
    result = 'Error';
  }

  $output.trigger('update:output', result);
  output = (result === 'Error') ? 0 : parseFloat(result);
  calc = false;
  refreshInput();
};

var setPoint = function(){
  if (!input) {
    return;
  }

  if (!point) {
    point = true;
    input += '.';
  }
};

var percent = function(){
  if (input === '') {
    return;
  }

  input = String(parseFloat(input) / 100);
  point = true;
  $output.trigger('update:output', input);
};

var refreshInput = function(){
  input = '';
  point = false;
};

var toggleNumber = function(){
  if (!input) {
    return;
  }

  if (negative) {
    negative = false;
    input = input.substr(1);
  } else {
    negative = true;
    input = '-' + input;
  }

  $output.trigger('update:output', input);
};

var click = function(elm){
  var btn = $(elm).data('btn');

  switch (btn) {
    case 'clear':
      clear();
      break;
    case 'toggleNumber':
      toggleNumber();
      break;
    case 'percent':
      percent();
      break;
    case 'divide':
    case 'multiply':
    case 'subtract':
    case 'add':
      setCalc(btn);
      break;
    case 'point':
      setPoint();
      break;
    case 'equal':
      equal();
      break;
    default:
      numeric(btn);
      break;
  }
};

$(function(){
  $('.cell').on({
    'touchstart mousedown': function(e){
      $(this).addClass('touched');
      e.preventDefault();
    },
    'touchmove mousemove': function(e){
      e.preventDefault();
    },
    'touchend mouseup': function(){
      $(this).removeClass('touched');
      click(this);
    }
  });

  $output.on('update:output', function(e, val){
    $(this).text(val);
  });
});
