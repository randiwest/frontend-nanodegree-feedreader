/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are present for all feeds', function() {
            for( var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).toBeTruthy();
            }
        });

        /* This a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Names are present for all feeds', function() {
            for( var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).toBeTruthy();
            }
        });
    });

    /* This is a test suite named "The menu" */
    describe('The menu', function() {
        var body = $('body');
        /* This is a test that ensures the menu element is
         * hidden by default. I added the jasmine-jquery
         * library to allow access to the DOM.
         */
        it('Menu element hidden by default', function() {
            expect(body).toHaveClass('menu-hidden');
        });

         /* This is a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: the menu displays when
          * clicked and hides when clicked again.
          */
        it('Menu changes visibility when clicked', function() {
            var icon = $('a.menu-icon-link');
            icon.click();
            expect(body).not.toHaveClass('menu-hidden');

            //Test that the menu hides again on second click.
            icon.click();
            expect(body).toHaveClass('menu-hidden');
        });
    });

    /* This is a test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * As loadFeed() is asynchronous this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done){
            loadFeed(0,done);
        });

        it('loadFeed function creates at least one element', function() {
            var entry = $('.entry');
            expect(entry).toExist();
        });
     });

    /* This is a test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {
        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var feedOneTitle,
            feedTwoTitle;

        beforeEach(function(done){
            loadFeed(0, function(){
                feedOneTitle = $('.feed').find('h2').text();
                //console.log(feedOneTitle);
                done();
            });
        });

        it('content changes when new feed loaded', function(done) {
            loadFeed(1, function() {
                feedTwoTitle = $('.feed').find('h2').text();
                //console.log(feedTwoTitle);
                expect(feedOneTitle).not.toEqual(feedTwoTitle);
                done();
            });
        });
    });
}());