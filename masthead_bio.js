/**
* @author: Flightmare (http://elderscrolls.wikia.com/wiki/User:Flightmare)
* @version: 1.0
* @license: CC-BY-SA 3.0
* @description: Imports the discussions bio (app profile) into the masthead.
*/
require(['jquery', 'wikia.ui.factory'], function ($, uiFactory) {
	'use strict';
	uiFactory.init('modal').then(function (uiModal) {
        var bioText = '';
		$(function () {
            //Test page for masthead and link to discussions profile and check for double loads
            if($('#discussion-bio').length === 0 && $('#UserProfileMasthead #discussionAllPostsByUser').attr('href')) {
                var userId = $('#UserProfileMasthead #discussionAllPostsByUser').attr('href').split('/')[3];

                //Fetch bio
                $.ajax({
                    type: 'GET',
                    url: 'https://services.wikia.com/user-attribute/user/' + userId + '/attr/bio',
                    success: function(data) {
                        bioText = data.value;
                        //Create new masthead entry
                        $('.UserProfileMasthead .details').append('<li itemprop="bio" id="discussion-bio" style="max-height: 100px; overflow: hidden; transition: max-height 1s"><span>BIO</span> ' + bioText.replace(/(?:\r\n|\r|\n)/g, '<br />') + '</li>');

                        //Add expand toggle button if overflow happens
                        if($('#discussion-bio').prop('scrollHeight') > $('#discussion-bio').outerHeight()) {
                            $('#discussion-bio').after('<span id="discussion-bio-toggle" style="float:right">[Show more]</span>');
                            // opening a content-size modal example
                			$('#discussion-bio-toggle').click(function () {
                				var modalConfig = {
                					type: 'default',
                					vars: {
                						id: 'discussionsbiomodal',
                						size: 'content-size',
                						content: '<p>' + bioText.replace(/(?:\r\n|\r|\n)/g, '<br />') + '</p>',
                						class: 'styleguide-example-content-size',
                						title: 'Biography',
                						closeText: 'Close',
                						buttons: [
                							{
                								vars: {
                									value: 'Close',
                									classes: 'primary',
                									data: [
                										{
                											key: 'event',
                											value: 'close'
                										}
                									]
                								}
                							}
                						]
                					}
                				};
                				showModal(modalConfig);
                			});
                        }
                    }
                });
            }

			/**
			 * Shows a modal; unified function for different modals
			 *
			 * @param {Object} modalConfig - uiFactory modal config object
			 * @param {Function} callback - optional; Callback after modal is initialized
			 */
			function showModal(modalConfig, callback) {
				if (typeof callback !== 'function') {
					callback = function (demoModal) {
						demoModal.show();
					};
				}
				uiModal.createComponent(modalConfig, callback);
			}
		});
	});

});
