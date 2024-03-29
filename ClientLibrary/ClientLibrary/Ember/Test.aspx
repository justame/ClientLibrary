﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Test.aspx.cs" Inherits="ClientLibrary.Ember.Test" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../Javascript/Base/jquery.1.7.1.js" type="text/javascript"></script>
    <script src="../Javascript/Base/handlebars-1.0.0.beta.6.js" type="text/javascript"></script>
    <script src="../Javascript/Base/ember-0.9.8.1.min.js" type="text/javascript"></script>
</head>
<body>
    <h1>TEST</h1>
    <div id="todoapp">
    <div class="title">
      <h1>Todos</h1>
    </div>
    <div class="content">
      <script type="text/x-handlebars">
        <div id="create-todo">
          {{view Todos.CreateTodoView id="new-todo" placeholder="What needs to be done?"}}
        </div>
      
        <div id="stats-area">
          <div class="mark-all-done">
            {{view Todos.MarkAllCompleteView title="Mark all as complete"}}
          </div>
        </div>
      
        <div id="todos">
          <ul id="todo-list">
            {{#each Todos.Controller.todos}}
              <li>
                {{view Ember.Checkbox titleBinding="title" valueBinding="isDone"}}
              </li>
            {{/each}}
          </ul>
        </div>
      
        <div id="todo-stats">
          {{#view Ember.Button target="Todos.Controller" action="clearCompleted"}}
            Clear {{Todos.Controller.completedCount}}} completed items
          {{/view}}
          {{Todos.Controller.remainingCount}} items left
        </div>
      </script>   
    </div>
  </div>
    <script src="test.js" type="text/javascript"></script>

</body>
</html>
