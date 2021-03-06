Template.courseSidebar.rendered = function () {
    // Get the template instance
    var instance = Template.instance();

    // Get the current router object
    var controller = Router.current();

    // Get course ID from router object
    var courseID = controller.params._id;

    /*
    Enable sidebar inline editors
    */
    this.enableSidebarInlineEditors = function () {
        // Course sections
        $('.section-title').editable({
            // Don't display updated text
            // prevents duplicate text
            display: false
        });

        // Lesson titles
        $('.sidebar-lesson-title').editable({mode: 'inline'});
    };

    /*
    Disable sidebar inline editors
    */
    this.disableSidebarInlineEditors = function () {
        // Lesson title(s)
        $('.sidebar-lesson-title').editable('destroy');

        // Section title(s)
        $('.section-title').editable('destroy');
    };

    /*
    Toggle inline editors when editing course
    */
    this.autorun(function () {
        if (Session.get('editingCourseID') === courseID) {
            instance.enableSidebarInlineEditors();
        } else {
            instance.disableSidebarInlineEditors();
        }
    });
};

Template.courseSidebar.helpers({
    /*
    Return true when editing the active course
    Used to display 'Add section' form
    */
    'editingThisCourse': function () {
        // return true if editing this course
        return (Session.get('editingCourseID') === this._id);
    }
});
