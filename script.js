document.addEventListener('DOMContentLoaded', function() {
    var courseDropdown = document.getElementById('courseDropdown');
    var courseSections = document.querySelectorAll('.course-section');

    // Functionality for course selection
    courseDropdown.addEventListener('change', function() {
        var selectedCourse = this.value;
        courseSections.forEach(section => section.style.display = 'none');
        var selectedSection = document.querySelector(`.course-section[data-course="${selectedCourse}"]`);
        if (selectedSection) selectedSection.style.display = 'block';
    });

    // Modal functionality
    var studentModal = document.getElementById('studentModal');
    var addStudentModal = document.getElementById('addStudentModal');

    function openModal(modal) {
        modal.style.display = 'block';
    }
    function closeModal(modal) {
        modal.style.display = 'none';
    }

    document.querySelectorAll('.close-button').forEach(btn => {
        btn.addEventListener('click', function() {
            closeModal(btn.closest('.modal'));
        });
    });

    // Add student form submission
    document.getElementById('addStudentForm').addEventListener('submit', function(event) {
        event.preventDefault();
        var studentID = document.getElementById('studentID').value;
        var universityID = document.getElementById('universityID').value;
        var name = document.getElementById('name').value;
        var projectLink = document.getElementById('projectLink').value;
        var workingCode = document.getElementById('workingCode').value;

        var selectedCourse = courseDropdown.value;
        var courseSection = document.querySelector(`.course-section[data-course="${selectedCourse}"]`);
        var tbody = courseSection.querySelector('tbody');
        var newRow = document.createElement('tr');
        
        newRow.innerHTML = `
            <td>${studentID}</td>
            <td>${universityID}</td>
            <td><a href="#" class="student-name">${name}</a></td>
            <td><a href="${projectLink}" target="_blank">Project Link</a></td>
            <td><a href="${workingCode}" target="_blank">Live Demo</a></td>
        `;
        
        tbody.appendChild(newRow);
        addStudentForm.reset();
        closeModal(addStudentModal);
    });
});

// Search functionality
function searchProjects() {
    var input = document.querySelector('.search-input');
    var filter = input.value.toUpperCase();
    document.querySelectorAll('tbody tr').forEach(row => {
        var textContent = row.textContent.toUpperCase();
        row.style.display = textContent.includes(filter) ? '' : 'none';
    });
}
