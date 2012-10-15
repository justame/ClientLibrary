/// <reference path="../../Javascript/Base/core.0.0.1.js" />

var AutoCompleteRowModel = Backbone.Model.extend({
    defaults: {
        id: null,
        label: null,
        value: null,
        selected: false,
        metadata: null
    },
    initialize: function () {
    }
});

var AutoCompleteRowCollection = Backbone.Collection.extend({
    model: AutoCompleteRowModel
});

var AutoCompleteCollectionView = Backbone.View.extend({
    vent: null,
    tagName: 'ul',
    render: function () {
        return this;
    },
    itemAdd: function (row) {
        var rowView = new AutoCompleteRowView({ model: row, vent: this.vent });
        this.$el.append(rowView.render().$el);
    },
    show: function () {
        this.$el.show();
        this.isMenuOpen = true;
    },
    hide: function () {
        this.$el.hide();
        this.isMenuOpen = false;
    },
    menuOpen: function () {
        if (this.collection != null && this.collection.length > 0) {
            this.show();
        }
    },
    menuClose: function () {
        this.hide();
    },
    navigateDown: function(){
        if (this.isMenuOpen) {
        }
    },
    initialize: function (options) {
        this.isMenuOpen = false;
        this.vent = options.vent;
        _.bindAll(this, 'itemAdd', 'show', 'hide', 'menuOpen', 'menuClose', 'remove','navigateDown');
        this.collection.on('add', this.itemAdd);
        this.collection.on('reset', this.remove);
        this.collection.each(this.itemAdd);
        this.vent.on('menuOpen', this.menuOpen);
        this.vent.on('menuClose', this.menuClose);
        this.vent.on('navigateDown', this.navigateDown);
    }
});

var AutoCompleteRowView = Backbone.View.extend({
    tagName: 'li',
    events: {
        'mouseenter': '_rowSelect',
        'mouseleave': '_rowUnselect',
        'click': 'select'
    },
    mark: function () {
        this.$el.css('background', 'red');
    },
    unmark: function () {
        this.$el.css('background', 'white');
    },
    _rowSelect: function () {
        this.model.set('selected', true);
    },
    _rowUnselect: function () {
        this.model.set('selected', false);
    },
    _selectedChange: function () {
        var selected = this.model.get('selected');
        if (selected) {
            this.mark();
        } else {
            this.unmark();
        }
    },
    select: function () {
        this.model.set('selected', true);
        this.vent.trigger('AutoCompleteRowView:select', this);
    },
    render: function () {
        this.$el.html('<span>' + this.model.get('label') + ' ' + this.model.get('value') + '</span>')
        return this;
    },
    initialize: function (options) {
        _.bindAll(this, '_selectedChange', '_rowSelect', '_rowUnselect', 'render', 'select');
        this.vent = options.vent;
        this.model.on('change:selected', this._selectedChange); // check this line
    }
});

var AutoCompleteModel = Backbone.Model.extend({
    defaults: {
        dataSource: [{ label: 'yaron', value: 1 }, { label: 'maor', value: 3 }],
        searchTermOld: '',
        searchTerm: '',
        textDefault: 'Search',
        rowCollection: null,
        rowSelect: null
    },
    search: function (searchTerm, dataSource, callback) {
        var result = [];
        if (searchTerm.length > 0) {
            result = _.filter(dataSource, function (item) {
                return _.str.include(item.label, searchTerm);
            });
        };
        callback(dataSource, result);
    },
    _searchTermChange: function () {
        this.set('searchTermOld', this.previous('searchTerm'));
        var searchTerm = this.get('searchTerm');
        this.search(this.get('searchTerm'), this.get('dataSource'), this.searchDone);
    },
    searchDone: function (dataSource, result) {
        this.set('dataSource', dataSource);
        this.get('rowCollection').reset(result);
    },
    dataSourceChange: function () {
        var collection = this.get('rowCollection');
        collection.reset(this.get('dataSource'));
        //this.set('rowCollection', new AutoCompleteRowCollection(this.get('dataSource')));
    },
    initialize: function () {
        _.bindAll(this, '_searchTermChange', 'dataSourceChange', 'search', 'searchDone');
        this.on('change:searchTerm', this._searchTermChange);
        this.on('change:dataSource', this.dataSourceChange);
        this.set('rowCollection', new AutoCompleteRowCollection({ collection: this.get('dataSource') }));
    }
});

var AutoCompleteView = Backbone.View.extend({
    vent: null,
    events: {
        'keyup': 'search',
        'keydown': 'navigate',
        'blur': 'menuClose',
        'focus': 'menuOpen'
    },
    search: function () {
        var searchTerm = this.$el.val();
        this.model.set('searchTerm', searchTerm);
    },
    menuOpen: function () {
        this.vent.trigger('menuOpen');
    },
    menuClose: function () {
        var that = this;
        setTimeout(function () {
            that.vent.trigger('menuClose');
        }, 250);
    },
    navigateUp: function () {

    },
    navigateDown: function () {
        this.vent.trigger('navigateDown');
    },
    navigate: function (e) {
        // key down - 40
        // key up - 38
        if (e.which == 40) {
            this.navigateDown();
        }
    },
    focus: function () {

    },
    dataSourceChange: function () {
        var rowCollection = this.model.get('rowCollection');
        if (rowCollection.length > 0) {
            var collection = new AutoCompleteCollectionView({ collection: rowCollection, vent: this.vent });
            g.$$('results').html(collection.render().$el);
            this.menuOpen();
        } else {
            this.menuClose();
        }
    },
    rowSelect: function (row) {
        this.model.set('searchTerm', { silent: true });
        this.$el.val(row.model.get('label'));
        this.model.set('rowSelect', row);

    },
    render: function () {

    },
    rowSelectClear: function () {
        var searchTermOld = this.model.get('searchTerm');
        var row = this.model.get('rowSelect');
        if (row != null && searchTermOld != row.model.get('label')) {
            this.model.set('rowSelect', null);
        };

    },
    initialize: function (options) {
        this.vent = options.vent;
        _.bindAll(this, 'menuClose', 'menuOpen', 'search', 'navigateUp', 'navigateDown', 'dataSourceChange', 'rowSelect', 'rowSelectClear', 'navigate');
        this.model.get('rowCollection').on('reset', this.dataSourceChange);
        this.vent.on('AutoCompleteRowView:select', this.rowSelect);
        this.model.on('change:searchTerm', this.rowSelectClear);
        g.log(this.$el);
    }
});

$(function () {
    var vent = _.extend({}, Backbone.Events);
    var auto = new AutoCompleteModel({
    });
    window.autocomplete = new AutoCompleteView({ el: g.$$('inptAutoComp'), model: auto, vent: vent });
});