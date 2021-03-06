App = Ember.Application.create({});

var posts = [{
  id: '1',
  title: "Rails is Omakase",
  author: { name: "d2h" },
  date: new Date('12-27-2012'),
  excerpt: "There are lots of à la carte software environments in this world. Places where in order to eat, you must first carefully look over the menu of options to order exactly what you want.",
  body: "I want this for my ORM, I want that for my template language, and let's finish it off with this routing library. Of course, you're going to have to know what you want, and you'll rarely have your horizon expanded if you always order the same thing, but there it is. It's a very popular way of consuming software.\n\nRails is not that. Rails is omakase."
}, {
  id: '2',
  title: "The Parley Letter",
  author: { name: "d2h" },
  date: new Date('12-24-2012'),
  excerpt: "My [appearance on the Ruby Rogues podcast](http://rubyrogues.com/056-rr-david-heinemeier-hansson/) recently came up for discussion again on the private Parley mailing list.",
  body: "A long list of topics were raised and I took a time to ramble at large about all of them at once. Apologies for not taking the time to be more succinct, but at least each topic has a header so you can skip stuff you don't care about.\n\n### Maintainability\n\nIt's simply not true to say that I don't care about maintainability. I still work on the oldest Rails app in the world."  
}];


var themes = [
  {
    id: '1',
    name: "Deployment",
    cost: "$22,000",
  }, 
  {
    id: '2',
    name: "Design",
    cost: "$3,000",
  },
  {
    id: '3',
    name: "Testing",
    cost: "$5,000",
  },
  {
    id: '4',
    name: "Capacity",
    cost: "$6,000",
  },
  {
    id: '5',
    name: "Monitoring",
    cost: "$2,000",
  },
  {
    id: '6',
    name: "Unknown",
    cost: "$12,000",
  }
];

App.Router.map(function() {
  this.resource('themes', function() {
    this.resource('theme', { path: ':theme_id' });
  });
  this.resource('about');
  this.resource('posts', function() {
    this.resource('post', { path: ':post_id' });
  });
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return posts;
  }
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return posts.findBy('id', params.post_id);
  }
});

App.ThemesRoute = Ember.Route.extend({
  model: function() {
    return themes;
  }
});

App.ThemeRoute = Ember.Route.extend({
  model: function(params) {
    var data = { 
      theme: themes.findBy('id', params.theme_id),
      incidents:[
        { description: "incident1"},
        { description: "incident2"},
        { description: "incident3"}
      ]
    }
    return data;
  }
});

App.PostController = Ember.ObjectController.extend({
  isEditing: false,
  
  actions: {
    edit: function() {
      this.set('isEditing', true);
    },

    doneEditing: function() {
      this.set('isEditing', false);
    }
  }
});

var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input) {
  return new Handlebars.SafeString(showdown.makeHtml(input));
});

Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});
