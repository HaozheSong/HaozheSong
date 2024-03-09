const chat_box_cookie_expired_days = 7
const chat_box_QA_animation_transition = 1500; // milliseconds

// preprocess the chat box
$(function () {
    // append a reply btn
    const reply_btn = $(`<div id="replay_btn" style="display: none;">
                                                <button class="btn btn-success">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                         viewBox="0 0 16 16" style="vertical-align: -0.125rem">
                                                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                                                    </svg>
                                                    Replay
                                                </button>
                                            </div>`);
    $('#chat_box').append(reply_btn);
    // style the chat box
    $('#chat_box .answer').each(function () {
        const text = $(this).html();
        $(this).addClass('row');
        $(this).html(`<div class="col-auto alert alert-primary">${text}</div>`);
        $(this).hide();
    });
    $('#chat_box .question').each(function () {
        const text = $(this).html();
        $(this).addClass('row justify-content-end');
        $(this).html(`<div class="col-auto alert alert-success">${text}</div>`);
        $(this).hide();
    });
})

// animation
function scroll_bottom() {
    $("html, body").animate({scrollTop: $(document).height()}, 1000);
}

function chat_box_animation(jq_obj) {
    if ($(jq_obj).attr('class').search('answer') === 0) {
        // if this message is an answer, show this message then the next.
        $(jq_obj).fadeIn(chat_box_QA_animation_transition, function () {
            if ($(jq_obj).nextAll().length !== 1) {
                scroll_bottom();
                chat_box_animation($(jq_obj).next());
            } else {
                // no more messages
                const reply_btn = $(`<div id="replay_btn" style="display: none">
                                                <button class="btn btn-success">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                         viewBox="0 0 16 16" class="bs_icon">
                                                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                                                    </svg>
                                                    Replay
                                                </button>
                                            </div>`);
                $(jq_obj).after(reply_btn);
                $('#replay_btn').fadeIn(chat_box_QA_animation_transition, function () {
                    $('#personal_info').fadeIn(chat_box_QA_animation_transition);
                    scroll_bottom();
                });
                const date_now = Date.now(); // milliseconds
                const date_one_week_later = new Date(date_now + 1000 * 60 * 60 * 24 * chat_box_cookie_expired_days);
                document.cookie = `chat_box_viewed=1; expires=${date_one_week_later.toUTCString()}`;
            }
        })
    } else {
        // if this message is a question, add a button. When clicked, remove it, show this message and the next.
        const question_text = $(jq_obj).text();
        let notice_text = '';
        if (question_text.search(/[A-Za-z]+/) === 0) {
            notice_text = '(click here for more)'
        } else {
            notice_text = '(点此了解更多)'
        }
        const question_btn = $(`<button class="btn btn-success question_btn" type="button" style="display:none">${question_text}
                ${notice_text}</button>`)
        $(jq_obj).after(question_btn);
        question_btn.fadeIn(chat_box_QA_animation_transition, scroll_bottom);
        question_btn.click(function () {
            question_btn.remove();
            $(jq_obj).fadeIn(chat_box_QA_animation_transition, function () {
                scroll_bottom();
                chat_box_animation($(jq_obj).next());
            })
        })
    }
}

// start animation
$(function () {
    if (document.cookie.search('chat_box_viewed') === 0) {
        // chat box has been viewed
        $('#chat_box').children().each(function () {
            $(this).show();
        })
        $('#personal_info').show();
    } else {
        // chat box is not viewed
        chat_box_animation($('#chat_box').children().first());
    }

    $('#replay_btn').click(function () {
        document.cookie = 'chat_box_viewed=1; expires=Thu, 01 Jan 1970 00:00:01 GMT';
        location.reload();
    })
})