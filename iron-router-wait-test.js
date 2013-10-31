var items = new Meteor.Collection('items');

if (Meteor.isClient) {
    Template.hello.greeting = function () {
        return "Welcome to iron-router-wait-test.";
    };

    Template.hello.events({
        'click input' : function () {
            // template data, if any, is available in 'this'
            if (typeof console !== 'undefined')
                console.log("You pressed the button");
        }
    });

    var s = Meteor.subscribe('items');

    Router.map(function () {
        this.route('hello', {
            path: '/',
            data: function() {
                console.log(s.ready());
            },
            waitOn: function() {
                return [s];
            }
        });
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup

        Meteor.publish('items', function() {
            return items.find();
        });
    });
}
