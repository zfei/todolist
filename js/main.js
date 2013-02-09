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
			$('#tasks').append('<li>' + task_name + '</li>');
			$('#dones').append('<li>Done</li>');
			$('#removes').append('<li>Remove</li>');
		}
	});

	$(document).on("click", ".done", function(){
		if($(this).html() === "Done") {
			$(this).html("Undone");
		} else {
			$(this).html("Done");
		}
	});

	$(document).on("click", ".remove", function(){
		var $remove_class = $(this).attr("class");
		$remove_class = $remove_class.split(" ")[1];
		$('.'+$remove_class).hide("slow", function(){
			$('.'+$remove_class).remove();
		});
	});

});