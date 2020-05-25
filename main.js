let output = document.getElementById('screen');
var elements = document.getElementsByTagName('button');
var que = [];

// function for calculating values
function calculate(output, que) {
   if (output.value == '') {
       que.length = 0;
       new_num = 0;
   } else {
       que[2] = output.value
       if (que.length == 3) {
           var num_1 = parseFloat(que[0])
           var operator = que[1]
           var num_2 = parseFloat(que[2])
           if (operator == '*') {
               var new_num = num_1 * num_2
           } else if (operator == '/') {
               var new_num = num_1 / num_2
           } else if (operator == '+') {
               var new_num = num_1 + num_2
           } else {
               var new_num = num_1 - num_2
           }
       } else {
           new_num = output.value
       }
       if (isNaN(new_num)) {
           que.length = 0;
           new_num = 0
           que[0] = new_num
       } else {
           que.length = 0;
           que[0] = new_num
       }
   }
   output.value = new_num
   return que
}

// clears the active operator on the front end
function clearActive(elements) {
   for (i = 0; i < elements.length; i++) {
       if (elements[i].id == 'active') {
           elements[i].id = 'operator';
       }
       elements[i].classList.remove('active')
   }
}

function display(output, text, elements) {
   var active = false;
   for (i = 0; i < elements.length; i++) {
       if (elements[i].id == 'active') {
           elements[i].id = 'operator'
           active = true;
       }
   }
   if (active == true) {
       output.value = '';
       output.value = text;
   } else {
       output.value += text;
   }
}

function operate(selected, elements, que, output) {
   clearActive(elements)
   selected.id = 'active'
   selected.classList.add('active')
   if (que.length == 2) {
       calculate(output, que);
       que[1] = selected.innerHTML
   } else {
       que[0] = output.value
       que[1] = selected.innerHTML
   }
   return que
}

// add event listeners to all buttons
for (i = 0; i < elements.length; i++) {
   if (elements[i].id == 'calculate') {
       elements[i].addEventListener("click", function () {
           calculate(output, que);
           clearActive(elements)
       });
   } else if (elements[i].id == 'clear') {
       elements[i].addEventListener("click", function () {
           output.value = '';
           que.length = 0;
           clearActive(elements)
       });
   } else if (elements[i].id == 'operator') {
       let selected = elements[i];
       elements[i].addEventListener("click", function () {
           operate(selected, elements, que, output);
       })
   } else {
       let text = elements[i].innerHTML;
       elements[i].addEventListener("click", function () {
           display(output, text, elements);
       });
   }
}ss