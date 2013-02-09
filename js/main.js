$(document).ready(function() {

	var setLists = function(lists) {
		localStorage.setItem("lists", JSON.stringify(lists));
	}

	var getLists = function() {
		var lists = localStorage.getItem("lists");
		if(lists === null) {
			localStorage.setItem("lists", "[]");
			lists = "[]";
		}
		return JSON.parse(lists);
	}

	var getTasks = function() {
		var lists = getLists();
		if(lists === []) {
			return [];
		}
		var list_name = $('#list .selected').html();
		if(list_name === "") {
			return [];
		}
		var tasks = [];
		for(var i = 0; i < lists.length; i++) {
			if(lists[i].list_name === list_name) {
				tasks = lists[i].tasks;
				break;
			}
		}
		return tasks;
	};

	var showLists = function() {
		var lists = getLists();
		$('#list').empty();
		$('#list').append('<li id="new_list">New List</li>');
		if(lists === []) {
			return;
		}
		for(var i = 0; i < lists.length; i++) {
			if(i === 0) {
				$('#list').append('<li class="selected">' + lists[i].list_name + '</li>');
			} else {
				$('#list').append('<li>' + lists[i].list_name + '</li>');
			}
		}
	}

	var showTasks = function() {
		var tasks = getTasks();
		$('#tasks').empty();
		$('#tasks').append('<li id="new_task">New Task</li>');
		$('#dones').empty();
		$('#dones').append('<li class="label">Done</li>');
		$('#removes').empty();
		$('#removes').append('<li class="label">Remove</li>');
		for(var i = 0; i < tasks.length; i++) {
			var task_name = tasks[i].task_name;
			var done = tasks[i].done;
			$('#tasks').append('<li class="task' + i + '">' + task_name + '</li>');
			$('#dones').append('<li class="task' + i + '"><img class="' + done +'" src="./img/icon/' + done + '.png"></li>');
			$('#removes').append('<li class="task' + i + '"><img class="remove" src="./img/icon/del.png"></li>');
		}
	}

	showLists();

	showTasks();

	var addList = function(list_name) {
		var lists = getLists();
		var list_obj = {
			"list_name": list_name,
			"tasks": []
		};
		lists.push(list_obj);
		setLists(lists);
	}

	var addTask = function(task_name) {
		var lists = getLists();
		if(lists === []) {
			return;
		}
		var list_name = $('#list .selected').html();
		if(list_name === null) {
			return;
		}
		for(var i = 0; i < lists.length; i++) {
			if(lists[i].list_name === list_name) {
				lists[i].tasks.push({
					"task_name": task_name,
					"done": "undone"
				});
				setLists(lists);
				break;
			}
		}
	}

	$(document).on("click", "#new_list", function() {
		var list_name = prompt("Please enter list name", "My List");
		if(list_name != null && list_name != "") {
			$('#list').append('<li>' + list_name + '</li>');
			addList(list_name);
		}
	});

	$(document).on("click", "#new_task", function() {
		var task_name = prompt("Please enter task name", "My task");
		if(task_name != null && task_name != "") {
			var index = $('#tasks').children().size() - 1;
			$('#tasks').append('<li class="task' + index + '">' + task_name + '</li>');
			$('#dones').append('<li class="task' + index + '"><img class="undone" src="./img/icon/undone.png"></li>');
			$('#removes').append('<li class="task' + index + '"><img class="remove" src="./img/icon/del.png"></li>');
			addTask(task_name);
		}
	});

	$(document).on("click", "#list li", function() {
		if($(this).hasClass("selected") || $(this).attr("id") === "new_list"){
			return;
		}
		$('.selected').removeClass("selected");
		$(this).addClass("selected");
		showTasks();
	});

	var removeTask = function(task_num) {
		var lists = getLists();
		if(lists === []) {
			return;
		}
		var list_name = $('#list .selected').html();
		if(list_name === null) {
			return;
		}
		for(var i = 0; i < lists.length; i++) {
			if(lists[i].list_name === list_name) {
				var new_tasks = [];
				for(var j = 0; j < lists[i].tasks.length; j++) {
					if(j == task_num) {
						continue;
					}
					new_tasks.push(lists[i].tasks[j]);
				}
				lists[i].tasks = new_tasks;
				setLists(lists);
				break;
			}
		}
	}

	var setDone = function(task_num, done) {
		var lists = getLists();
		if(lists === []) {
			return;
		}
		var list_name = $('#list .selected').html();
		if(list_name === null) {
			return;
		}
		for(var i = 0; i < lists.length; i++) {
			if(lists[i].list_name === list_name) {
				lists[i].tasks[task_num].done = done;
				setLists(lists);
				break;
			}
		}
	}

	$(document).on("click", "#dones li", function() {
		var $done_class = $(this).attr("class");
		if($(this).children().hasClass("done")) {
			$(this).children().removeClass("done");
			$(this).children().addClass("undone");
			$(this).children().attr("src", "./img/icon/undone.png");
			setDone($done_class.substring(4), "undone");
		} else {
			$(this).children().removeClass("undone");
			$(this).children().addClass("done");
			$(this).children().attr("src", "./img/icon/done.png");
			setDone($done_class.substring(4), "done");
		}
	});

	$(document).on("click", "#removes li", function() {
		var $remove_class = $(this).attr("class");
		$('.' + $remove_class).fadeOut("slow", function() {
			$('.' + $remove_class).remove();
		});
		removeTask($remove_class.substring(4));
	});

});