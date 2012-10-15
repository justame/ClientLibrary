// We always create an Ember application in the first line
Todos = Ember.Application.create();

// Then we define our models which *extend* the Ember object (so we can create instances)
Todos.Todo = Ember.Object.extend({
    title: null,
    isDone: false
});

// And finally we define a skeleton for our controller
// In this case we *create* an object as we only want one of them and it should be created immediately
Todos.Controller = Ember.Object.create({
    // We need an array to hold our Todo objects
    todos: Ember.A(),

    // We also override the default init function so we have some data to work with
    init: function () {
        // We always need to use a getter or setter for interacting with properties
        console.time('t');
        
        var items = this.get('todos');
        for (var i = 0; i < 500; i++) {
            items.addObject(Todos.Todo.create({ title: 'This is an Ember item' }));
        };
        console.timeEnd('t');
        
        console.log('done!!!!!!!');
        //items.addObject(Todos.Todo.create({ title: 'This is another Ember item' }));
    },
    remainingCount: function () { // computed property, change when isDone change
        return this.get('todos').filterProperty('isDone', false).length;
    } .property('todos.@each.isDone')
});

//console.time('t');
//var elm;
//var ul = $('#ulList');
//for (var i = 0; i < 500; i++) {
//    ul.append($('<li>').html('this is meber item'));
//}
//console.timeEnd('t');
