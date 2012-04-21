	var today = new Date();
	var f = document.form;
	f.year.value = today.getFullYear();
	f.month.value = today.getMonth() + 1;
	f.date.value = today.getDate();
	
	function buildCalendar(yy, mm, dd) { 			
		var Cell = new Array(42);
	    var dayOfYear = [, 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
		var daysInMonth = [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		var yearsFrom1900 = yy - 1900;
		var numberLeapYears = Math.floor(yearsFrom1900 / 4);
	
		if((yy % 4 == 0) && (yy % 100 != 0 || yy % 400 == 0)) {
			numberLeapYears--;
			daysInMonth[2]++;  
			if(mm > 2) dayOfYear[mm]++;
		}
				
		var firstDayMonth = ( yearsFrom1900 * 365 + numberLeapYears + dayOfYear[+mm] ) % 7; 
		if(firstDayMonth == 0) firstDayMonth = 7;
		var iter = firstDayMonth - 1;
		for(i = 0; i < firstDayMonth; i++, iter--)  {
			Cell[i] = daysInMonth[mm - 1] - iter;
		}
				
		for(i = firstDayMonth; i < daysInMonth[mm] + firstDayMonth; i++)  {
			Cell[i] = i - firstDayMonth + 1;
		}
			
		for(i = daysInMonth[mm] + firstDayMonth; i < 42; i++)  {
			Cell[i] = i - daysInMonth[mm] - firstDayMonth + 1;
		}
				
		$('<table></table>').attr('width', 307).attr('height', 260).attr('border', 3).attr('id', 'calendar').appendTo('#form');
		$('<tr id = "dayOfWeek"><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Вс</th></tr>').appendTo('#calendar');
		
		function painting() {
			$('th.worksElements').css('background', 'lightgray');
			for(i = firstDayMonth; i < firstDayMonth + daysInMonth[mm]; i++) 
				$('#' + i).css('background', 'cornsilk');
			if(yy == today.getFullYear() && mm == (today.getMonth() + 1))
				$('#' + (today.getDate() + firstDayMonth - 1)).css('background', 'chartreuse');
		}
				
		iter = 0;
		for(i = 0; i < 6; i++) {
			$('<tr></tr>').appendTo('#calendar');
			for(j = 0; j < 7; j++, iter++) 
				$('<th></th>').attr('id', iter).attr('class', 'worksElements').text(Cell[iter]).click(function() {
					if(firstDayMonth <= +$(this).attr('id') && $(this).attr('id') < firstDayMonth + daysInMonth[mm]) {
						painting();
						$(this).css('background', 'red');
						f.date.value = $(this).attr('id') - firstDayMonth + 1;
					}
					if(firstDayMonth + daysInMonth[mm] <= $(this).attr('id')) {
						f.date.value = $(this).text();
						monthButton('right');
					}
					if($(this).attr('id') < firstDayMonth) {
						f.date.value = $(this).text();
						monthButton('left');
					}
				}).appendTo('tr:last-child');
		}
				
		painting();
		$('#' + (+f.date.value + firstDayMonth - 1)).css('background', 'red');
	}
	
	
		
	function deleteCalendar() {
		$('#calendar').remove();
	}
	
	
		
	function getArrayWithDaysOfMonth() {
		var daysInMonth = [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		if((f.year.value % 4 == 0) &&   (f.year.value % 100 != 0 || f.year.value % 400 == 0)) daysInMonth[2]++;
		return daysInMonth;
	}
		
		
		
	function refresh() {
		var daysInMonth = getArrayWithDaysOfMonth();
		if(daysInMonth[f.month.value] < f.date.value) f.date.value = daysInMonth[f.month.value];
				
		if(1900 <= f.year.value  && f.year.value  <= 9999 &&
			  1 <= f.month.value && f.month.value <= 12   &&
		      1 <= f.date.value  && f.date.value  <= daysInMonth[f.month.value]) {
			deleteCalendar();
			buildCalendar(f.year.value, f.month.value, f.date.value);
		}
		else
			alert('Неверные данные. Введите значение года от 1900 до 9999, значение месяца от 1 до 12 и значение дня от 1 до 28-31');
	}
		
		
		
	function yearButton(checker) {
		if(checker == 'left')
			if(1900 < f.year.value) {
				f.year.value--;
				refresh();
			}
			
		if(checker == 'right') 	
			if(f.year.value < 9999) {
				f.year.value++;
				refresh();     
			}
	}
		
		
		
	function monthButton(checker) {
		var daysInMonth = getArrayWithDaysOfMonth();
	
		if(checker == 'left') {
			if(daysInMonth[f.month.value - 1] < f.date.value) f.date.value = daysInMonth[f.month.value - 1];
			if(2 <= f.month.value) {
				f.month.value--;
				refresh();
			}
			else {
				f.month.value = 12;
				yearButton('left');
			}
		}
					
		if(checker == 'right') {
			if(daysInMonth[+f.month.value + 1] < f.date.value) f.date.value = daysInMonth[+f.month.value + 1];
			if(f.month.value <= 11) {
				f.month.value++;
				refresh();     
			}
			else {
				f.month.value = 1;
				yearButton('right');
			}
		}
	}
		
		
		
	function dateButton(checker) {
		var daysInMonth = getArrayWithDaysOfMonth();
			
		if(checker == 'left')
			if(2 <= f.date.value) {
				f.date.value--;
				refresh();
			}
			else {
				f.date.value = daysInMonth[f.month.value - 1];
				monthButton('left');
			}
		
		if(checker == 'right') 
			if(f.date.value <= daysInMonth[f.month.value] - 1) {
				f.date.value++;
				refresh();     
			}
			else {
				f.date.value = 1;
				monthButton('right');
			}
	}
	
	buildCalendar(f.year.value, f.month.value, f.date.value);