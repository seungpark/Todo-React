(function () {
  "use strict"

  var TodoStore = window.TodoStore = {};
  var _todos = window._todos = [];
  var _callbacks = [];

  TodoStore.changed = function() {
    _callbacks.forEach(function(callback) {
      callback();
    });
  };

  TodoStore.addChangeHandler = function(callback) {
    _callbacks.push(callback);
  };

  TodoStore.removeChangeHandler = function(callback) {
    var idx = _callbacks.indexOf(callback);
    _callbacks.splice(idx, 1);
  };

  TodoStore.all = function () {
    return _todos.slice();
  };

  TodoStore.fetch = function () {
    $.ajax({
      url: '/api/todos',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        _todos = data;
        TodoStore.changed();
      }
    });
  };

  TodoStore.create = function (todo) {
    $.ajax({
      url: '/api/todos',
      type: 'POST',
      dataType: 'json',
      data: { todo: todo },
      success: function (data) {
        _todos.push(data);
        TodoStore.changed();
      }
    });
  };

  //how to test these functions
  //application.js --> require this file
  //go to root, console
  //find, destroy, toggle done

  TodoStore.find = function (id) {
    return _todos.find(function (todo) {
      if (todo.id === id) { return todo; }
    });
  };



  TodoStore.destroy = function (id) {
    var target = TodoStore.find(id);
    var targetIdx = _todos.findIndex(function (targ) {
      if (targ === target) { return targ; }
    });

    //no render in API CONTROLLER destroy so will throw server 500 error

    if (target) {
      $.ajax({
        url: '/api/todos/' + target.id,
        type: 'DELETE',
        dataType: 'json',
        success: function () {
          _todos.splice(targetIdx, 1);
          TodoStore.changed();
        }
      });
    }
  };

  TodoStore.toggleDone = function (id) {
    var target = TodoStore.find(id);

    if (target) {
      $.ajax({
        url: '/api/todos/' + target.id,
        type: 'PATCH',
        dataType: 'json',
        success: function () {
          if (target.done) {
            target.done = false;
          } else {
            target.done = true;
          }
        }
      });
    }
  };


})();
