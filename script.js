let body = $('body');
let todo_input = $('.todo-input');
let output = $('.output');
let remaining = $('.remaining');
let toggle = $('.toggle');
let mode = '';
let todo_output = $('.todo-output');

let output_container = $('.output-container');

// Toggle dark and light mode

function lightMode() {
    $('.sun').css('display', 'none');
    $('.moon').css('display', 'inline');
    if (window.innerWidth > 700) {
        $('.bg-img-dark').css('display', 'none');
        $('.bg-img-light').css('display', 'inline');
    } else {
        $('.mobile-img-dark').css('display', 'none');
        $('.mobile-img-light').css('display', 'inline');
    }
    body.addClass('body-light');
    todo_input.addClass('todo-input-light');
    remaining.addClass('remaining-light');
    output.addClass('output-light');

    output_container.addClass('output-container-light');
    mode = 'light';
}

function darkMode() {
    $('.sun').css('display', 'inline');
    $('.moon').css('display', 'none');
    if (window.innerWidth > 700) {
        $('.bg-img-dark').css('display', 'inline');
        $('.bg-img-light').css('display', 'none');
    } else {
        $('.mobile-img-dark').css('display', 'inline');
        $('.mobile-img-light').css('display', 'none');
    }
    body.removeClass('body-light');
    todo_input.removeClass('todo-input-light');
    remaining.removeClass('remaining-light');
    output.removeClass('output-light');

    output_container.removeClass('output-container-light');
    mode = 'dark';
}

toggle.on('click', event => {
    if ($('.sun').css('display') === 'inline') {
        lightMode();
    } else {
        darkMode();
    }
})



// Create todo
$('#input').on('keyup', el => {
    if (el.key === 'Enter' || el.key === 'NumpadEnter' || el.key === 13) {
        el.preventDefault()
        createTodo(el);
    }
})



// Input Check
let input_check = false;
$('.input-check').click(event => {
    event.stopImmediatePropagation();
    $(event.currentTarget).find('.check-bg').toggleClass('show');
    input_check = !input_check;
})

function createTodo(el) {
    el.stopImmediatePropagation();
    if ($('#input').val() !== '') {
        // Create a div
        const div = document.createElement('div');

        div.classList = 'output';
        if (mode === 'light') {
            div.classList += ' output-light';
        }
        if (input_check) {
            console.log(input_check);
            div.classList += ' todo-complete';

        }
        // Create a button
        const btn = document.createElement('button');
        btn.classList = ' check';
        // Create another div
        const btn_div = document.createElement('div');
        btn_div.classList = 'check-bg';
        const btn_img = document.createElement('img');
        btn_img.src = "images/icon-check.svg";
        btn_img.classList = 'check-icon';
        btn_div.append(btn_img);
        btn.append(btn_div);
        // Create a paragraph
        const p = document.createElement('p');
        p.innerHTML = $('#input').val();
        // Create an img
        const img = document.createElement('img');
        img.src = 'images/icon-cross.svg';
        img.classList = ' cross-img';
        // Append to div
        div.append(btn, p, img);

        // Appen to ouput container
        document.querySelector('.todo-output').append(div);

        output = $('.output');
        remaining = $('.remaining');
        todo_output = $('.todo-output');
        $('#input').val('');
        $('#chk').removeClass('show');
        input_check = false;

    }
    check_img();
    clearCompletedTodo();
    leftItems();
    draggable();
}

function draggable() {
    // Drop and Drag
    const drag = document.querySelector('.todo-output');
    console.log(drag);
    new Sortable(drag, {
        animation: 350
    });
}

function check_img() {
    $('.output').each((index, el) => {
        $(el).hover((event) => {
            event.preventDefault();
            $(event.currentTarget).find('.cross-img').addClass('show');
        }, (event) => {
            event.preventDefault();
            $(event.currentTarget).find('.cross-img').removeClass('show');
        })
    });

    // Check button Click
    $('.check').each((index, element) => {
        $(element).on('click', event => {
            event.stopImmediatePropagation();
            const parent = $($(event.currentTarget).parent());
            const btn = $($(event.currentTarget).children());

            if (btn.hasClass('show')) {
                btn.removeClass('show');
                parent.removeClass('todo-complete');

            } else {
                btn.addClass('show');
                parent.addClass('todo-complete');

            }
            leftItems();
        })
    })

    // Cross img click

    $('.cross-img').click(event => {
        const parent_container = $(event.currentTarget).parent();
        parent_container.addClass('remove-parent');
        parent_container.on('transitionend', event => {
            parent_container.remove();
            leftItems();
        })
    });
    leftItems();
}

// Clear completed todo
function clearCompletedTodo() {
    $('.clear-btn').on('click', event => {
        $('.todo-complete').each((index, element) => {
            $(element).remove();
            leftItems();
        })
    });
}

//Items left
function leftItems() {
    let left = $('.output').length - $('.todo-complete').length;
    $('#left').html(left + ' items left');
}

// Filter Items
$('.filter').each((index, el) => {
    $(el).on('click', event => {
        $('.active-btn-dark').removeClass('active-btn-dark');
        const cur = $(event.currentTarget);
        const text = cur.html();
        cur.addClass('active-btn-dark');
        const todos = $('.output');
        todos.each((index, el) => {
            switch (text) {
                case 'All':
                    $(el).css('display', 'flex');
                    break;
                case 'Active':
                    if (!($(el).hasClass('todo-complete'))) {
                        $(el).css('display', 'flex');
                    } else {
                        $(el).css('display', 'none');
                    }
                    break;
                case 'Completed':
                    if ($(el).hasClass('todo-complete')) {
                        $(el).css('display', 'flex');
                    } else {
                        $(el).css('display', 'none');
                    }
                    break;
            }
        });

    })
})
