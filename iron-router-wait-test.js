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

    //var s = Meteor.subscribe('items');
    var s;

    Router.map(function () {
        this.route('hello', {
            path: '/',
            before: function() {
                s = this.subscribe('items');
                s.wait();
            },
            data: function() {
                console.log('Should be true:', s.ready());
            }
            //,waitOn: s
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
