/// <reference path="../../Javascript/Base/core.0.0.1.js" />
/// <reference path="../../Javascript/Base/jquery.1.7.1.js" />
/// <reference path="../../Javascript/Base/backbone.js" />
/// <reference path="../../Javascript/Base/underscore.js" />
(function () {
    'use strict';

    var AutoCompleteRowModel = Backbone.Model.extend({
        defaults: {
            name: '',
            value: null,
            label: '',
            selected: false
        },
        validate: function (attr) {
            if (attr.mode != 'idle' && attr.mode != 'hover') {
                return 'mode was not set well';
            }
        },
        initialize: function () {
        }
    });

    var AutoCompleteRowView = Backbone.View.extend({
        vent: null,
        tagName: 'li',
        events: {
            'mouseenter': '_markRow',
            'mouseleave': '_unmarkRow',
            'click': 'select'
        },
        _markRow: function () {
            this.$el.css('background', 'red');
        },
        _unmarkRow: function () {
            this.$el.css('background', 'white');
        },
        select: function () {
            this.model.set('selected', true);
            this.vent.trigger('AutoCompleteRowView:select', { selected: true, value: this.model.get('value') });
        },
        unselect: function () {
            this.model.set('selected', false);
            this.vent.trigger('select', false);
        },
        _modeChange: function () {
            var mode = this.model.get('mode');
            if (mode == 'hover') {
                this._markRow();
            } else if (mode == 'idle') {
                this._unmarkRow();
            }
        },
        _selectChange: function () {
            if (this.model.get('selected') == true) {
                this.trigger('select');
            }
        },
        render: function () {
            this.$el.html('<span>this is value :' + this.model.get('name') + '</span>');
            return this;
        },
        initialize: function (options) {
            _.bindAll(this, '_unmarkRow', '_markRow', 'render', '_modeChange', 'select', 'unselect', '_selectChange');
            this.model.on('change:mode', this._modeChange);
            this.model.on('change:selected', this._selectChange);
            this.vent = options.vent;
        }
    });

    var AutoCompleteRowCollection = Backbone.Collection.extend({
        model: AutoCompleteRowModel,
        initialize: function () {
        }
    });

    var AutoCompleteCollectionView = Backbone.View.extend({
        vent: null,
        selectdItem: null,
        tagName: 'ul',
        addRow: function (row) {
            var that = this;
            var rowView = new AutoCompleteRowView({ model: row, vent: this.vent });
            rowView.on('select', function () { that._rowSelect(rowView) });
            this.$el.append(rowView.render().el);
        },
        _rowSelect: function (row) {
            //this.collectionAutoCompleteCollectionView
            this.selectdItem = row;
            this.trigger('select', row);
        },
        rowSelect: function (data) {
            this.hide();
        },
        hide: function () {
            this.isMenuOpen = false;
            this.$el.hide();
        },
        show: function () {
            if (this.collection.length > 0) {
                this.isMenuOpen = true;
                this.$el.show();
            }
        },
        clear: function () {
            this.$el.empty();
        },
        goUp: function () {
            
        },
        goDown: function () {

        },
        initialize: function (options) {
            this.vent = options.vent;
            _.bindAll(this, 'addRow', 'hide', 'show', 'clear', '_rowSelect', 'rowSelect')
            this.isMenuOpen = false;
            this.collection = new AutoCompleteRowCollection();
            this.collection.on('add', this.addRow);
            this.collection.on('reset', this.clear);

            this.vent.on('AutoCompleteRowView:select', this.rowSelect);

            this.$el.hide();


        }
    });

    var AutoCompleteModel = Backbone.Model.extend({
        defaults: {
            mode: 'none',
            searchTermOld: '',
            searchTerm: 'Search',
            itemSelectedIndex: null,
            defaultValue: 'Search',
            results: '',
            vent: _.extend({}, Backbone.Events)
        },
        search: function (searchTerm) {
            var that = this;
            setTimeout(function () {
                that._searchDone([
                    { value: 1, name: 'yaron' + Math.random(), mode: 'idle', selected: false },
                    { value: 2, name: 'maor', mode: 'idle', selected: false }
                ]);
            }, 100);
        },
        _searchDone: function (data) {
            this.set({ 'results': data });
        },
        _searchTermChange: _.debounce(function () {
            g.log(this.get('searchTerm'));
            if (this.get('searchTerm').trim().length > 0) {
                this.search(this.get('searchTerm').trim());
            }
        }, 300)
        ,
        initialize: function () {

            _.bindAll(this, '_searchTermChange', '_searchDone', 'search');

            this.on('change:searchTerm', this._searchTermChange);
        }
    });


    var AutoCompleteView = Backbone.View.extend({
        model: new AutoCompleteModel,
        el: '#inptAutoComp',
        rowCollection: null,
        vent: null,
        events: {
            'focus': '_focus',
            'blur': '_blur',
            'keyup': '_keyChange',
            'keydown': '_keyDown'
        },
        _focus: function () {
            this.model.set('searchTerm', this.$el.val(), { silent: true });
            if (this.model.get('searchTerm') == this.model.get('defaultValue')) {
                this._clear();
            };
            this.rowCollectionView.show();
        },
        _blur: function () {
            var value = this.$el.val();
            if (this._textboxValueGet().length == 0) {
                this._textboxValueSet(this.model.get('defaultValue'));
            }
        },
        _keyChange: function (e) {
            var value = this._textboxValueGet();
            this.model.set('searchTerm', value);
        },
        _clear: function () {
            this._textboxValueSet('');
        },
        _textboxValueGet: function () {
            return this.$el.val().trim();
        },
        _textboxValueSet: function (text) {
            this.$el.val(text);
        },
        _resultsChange: function () {
            var results = this.model.get('results');
            this.rowCollectionView.collection.reset();
            this.rowCollectionView = new AutoCompleteCollectionView({ vent: this.vent });
            this.rowCollectionView.collection.add(results);
            this.rowListRender();
        },
        rowListRender: function () {
            var collectionView;
            if (this.rowCollectionView.collection.length > 0) {
                g.$$('results').html(this.rowCollectionView.render().el);
                this.rowCollectionView.$el.show();
            };
        },
        _keyDown: function (e) {
            if ((this.rowCollectionView.isMenuOpen)) {
                if (e.which == 40) { // key down
                    this.rowCollectionView.goDown();
                } else if (e.which == 38) { // key up
                    this.rowCollectionView.goUp();
                }
            }
        },
        _selectRow: function (data) {
            this.$el.val(data.value);
        },
        initialize: function () {
            this.vent = this.model.get('vent');
            _.bindAll(this, 'rowListRender', '_textboxValueSet', '_clear', '_keyChange', '_blur', '_focus', '_resultsChange', '_selectRow', '_keyDown');
            this._textboxValueSet(this.model.get('defaultValue'));
            this.rowCollectionView = new AutoCompleteCollectionView({ vent: this.vent });
            this.model.on('change:results', this._resultsChange);

            this.vent.on('AutoCompleteRowView:select', this._selectRow);
        }

    });

    $(function () {
        window.autocomplete = new AutoCompleteView();
    });

} ());
