/*	main_scripts.js
___________________________________________________________________________________________________________________________________________________________________________________________ */

/*	Scroll Spy
=========================================================================================================================================================================================== */
$(document).ready(function () {
  // Cache selectors
  const sections = $("section");
  const navLinks = $("#navi a");

  $(window).on("scroll", function () {
    let currentSection = "";

    // find the current section in viewport
    sections.each(function () {
      const sectionTop = $(this).offset().top - 100; // adjust if header
      const sectionBottom = sectionTop + $(this).outerHeight();
      const scrollPos = $(window).scrollTop();

      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        currentSection = $(this).attr("id");
      }
    });

    // update nav links
    navLinks.removeClass("active");
    if (currentSection) {
      $(`#navi a[href="#${currentSection}"]`).addClass("active");
    }
  });
});

/*	Next Prev
=========================================================================================================================================================================================== */
$(document).ready(function () {
  const sections = $("#elements_container section");

  sections.each(function (i) {
    const $section = $(this);
    const $footerLinks = $section.find(".elements_sections_footers a");

    // Set Next link href
    const $nextLink = $footerLinks.filter(".next");
    if ($nextLink.length && i < sections.length - 1) {
      const nextId = sections.eq(i + 1).attr("id");
      $nextLink.attr("href", `#${nextId}`);
    }

    // Set Prev link href
    const $prevLink = $footerLinks.filter(".prev");
    if ($prevLink.length && i > 0) {
      const prevId = sections.eq(i - 1).attr("id");
      $prevLink.attr("href", `#${prevId}`);
    }
  });
});

/*	Counter
=========================================================================================================================================================================================== */
function updateGroupCount(group) {
    const countSpan = group.querySelector('.group-count');
    if (!countSpan) return;

    let count = 0;
    let next = group.nextElementSibling;

    while (next && !next.classList.contains('html_group')) {
        if (next.classList.contains('html_tag')) count++;
        next = next.nextElementSibling;
    }

    countSpan.textContent = count;
}

// Initial update
document.querySelectorAll('.html_group').forEach(updateGroupCount);

const container = document.querySelector('#table_lists_group');

const observer = new MutationObserver(mutations => {
    const groupsToUpdate = new Set();

    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1 && node.classList.contains('html_tag')) {
                // Find the closest previous group
                let group = node.previousElementSibling;
                while (group && !group.classList.contains('html_group')) {
                    group = group.previousElementSibling;
                }
                if (group) groupsToUpdate.add(group);
            }
        });

        mutation.removedNodes.forEach(node => {
            if (node.nodeType === 1 && node.classList.contains('html_tag')) {
                // When a tag is removed, find the group that used to contain it
                // Use mutation.target as a fallback
                let group = node.previousElementSibling;
                while (group && !group.classList.contains('html_group')) {
                    group = group.previousElementSibling;
                }
                if (!group) {
                    // fallback: use parent container's first group
                    group = container.querySelector('.html_group');
                }
                if (group) groupsToUpdate.add(group);
            }
        });
    });

    groupsToUpdate.forEach(updateGroupCount);
});

observer.observe(container, { childList: true, subtree: true });

/*	Scroll Snap
=========================================================================================================================================================================================== */
/* $(document).ready(function() {
	const $sections = $('.elements_sections');
	let scrollTimeout;

	$(window).on('wheel DOMMouseScroll', function(e) {
		clearTimeout(scrollTimeout);

		scrollTimeout = setTimeout(() => {
			const scrollTop = $(window).scrollTop();

			// Find nearest section
			let closestSection = $sections.first();
			let minDistance = Math.abs($sections.first().offset().top - scrollTop);

			$sections.each(function() {
				const distance = Math.abs($(this).offset().top - scrollTop);
				if (distance < minDistance) {
					minDistance = distance;
					closestSection = $(this);
				}
			});

			// Snap smoothly
			$('html, body').stop().animate({
				scrollTop: closestSection.offset().top
			}, 100);

		}, 100); // wait 100ms after last wheel event
	});
});
 */