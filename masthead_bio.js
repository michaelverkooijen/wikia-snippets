/**
* @author: Flightmare (http://elderscrolls.wikia.com/wiki/User:Flightmare)
* @version: 1.0
* @license: CC-BY-SA 3.0
* @description: Imports the discussions bio (app profile) into the masthead.
*/
$( document ).ready(function() {
    //Test page for masthead and link to discussions profile and check for double loads
    if($('#discussion-bio').length === 0 && $('#UserProfileMasthead #discussionAllPostsByUser').attr('href')) {
        var userId = $('#UserProfileMasthead #discussionAllPostsByUser').attr('href').split('/')[3];

        //Fetch bio
        $.ajax({
            type: 'GET',
            url: 'https://services.wikia.com/user-attribute/user/' + userId + '/attr/bio',
            success: function(data) {
                //Create new masthead entry
                $('.UserProfileMasthead .details').append('<li itemprop="bio" id="discussion-bio" style="max-height: 100px; overflow: hidden; transition: max-height 1s"><span>BIO</span> ' + data.value.replace(/(?:\r\n|\r|\n)/g, '<br />') + '</li>');

                //Add expand toggle button if overflow happens
                if($('#discussion-bio').prop('scrollHeight') > $('#discussion-bio').outerHeight()) {
                    $('#discussion-bio').after('<span id="discussion-bio-toggle" style="float:right">[Read more]</span>');
                    $('#discussion-bio-toggle').click(function() {
                        if($('#discussion-bio').css('max-height') == '100px' ) {
                            $('#discussion-bio').css('max-height', 'inherit');
                            $('#discussion-bio-toggle').text('[Read less]');
                        } else {
                            $('#discussion-bio').css('max-height', '100px');
                            $('#discussion-bio-toggle').text('[Read more]');
                        }
                    });
                }
            }
        });
    }
});
