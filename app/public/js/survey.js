$(function () {

	// $('#submit').on('click', function(){
	// 	console.log('hi');
	// }) 
	$('#submit').on('click', getResult)
	function getResult(event) {
		event.preventDefault();

		const answers = [
			parseInt($("input[name='q1']:checked").val()),
			parseInt($("input[name='q2']:checked").val())
		]

		const newEmployee = {
			employeeName: $('#nameInput').val().trim(),
			employeePic: $('#picInput').val().trim(),
			scores: answers
		}

		const validation1 = newEmployee.scores;
		const validation2 = newEmployee.employeeName;
		const validation3 = newEmployee.employeePic;

		validation1

		if (validation1.includes(NaN) || validation2 === "" || validation3 === "") {
			console.log("Error: please fill out all answers")
		} else {
			$.ajax({
				method: 'GET',
				url: '/api/employees',
			}).then(function (data) {
				console.log(data);

				let absValArray = [];
				for (let i = 0; i < data.length; i++) {
					// let testedEmployee = data[i];
					let compared = data[i];
					let sum = 0;
					for (let j = 0; j < newEmployee.scores.length; j++) {
						sum += Math.abs(newEmployee.scores[j] - compared.scores[j]);
					}
					absValArray.push(sum);
				}
				console.log(absValArray);
				const smallestDiff = Math.min(...absValArray);
				const location = absValArray.indexOf(smallestDiff);
				const match = data[location];

				console.log(match.employeeName);

				const partnerName = $('#partnerName');
				const partnerPic = $('#partnerPic');

				partnerName.empty();
				partnerPic.empty();

				partnerName.append(match.employeeName);
				partnerPic.append(`<img id="actualPic" src ="${match.employeePic}">`)
				console.log(match.employeePic);
			}).then(
				$.ajax({
					method: 'POST',
					url: '/api/employees',
					data: newEmployee
				})
			)
		}
	}
})