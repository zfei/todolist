$(document).ready(function() {

	$('#new_list').click(function() {
		var list_name = prompt("Please enter list name", "My List");
		if(list_name != null && list_name != "") {
			$('#list').append('<li>' + list_name + '</li>');
		}
	});

	$('#new_task').click(function() {
		var task_name = prompt("Please enter task name", "My task");
		if(task_name != null && task_name != "") {
			$('#tasks').append('<li class="task task">' + task_name + '</li>');
			$('#dones').append('<li class="status task"><img class="undone" src="./img/icon/undone.png"></li>');
			$('#removes').append('<li class="remove task"><img class="remove" src="./img/icon/del.png"></li>');
		}
	});

	$(document).on("click", ".status", function(){
		if($(this).children().hasClass("done")) {
			$(this).children().removeClass("done");
			$(this).children().addClass("undone");
			$(this).children().attr("src", "./img/icon/undone.png");
		} else {
			$(this).children().removeClass("undone");
			$(this).children().addClass("done");
			$(this).children().attr("src", "./img/icon/done.png");
		}
	});

	$(document).on("click", "li.remove", function(){
		var $remove_class = $(this).attr("class");
		$remove_class = $remove_class.split(" ")[1];
		$('.'+$remove_class).hide("slow", function(){
			$('.'+$remove_class).remove();
		});
	});

});