$('.scroll').click(function(e) {
    e.preventDefault();
    var url = this.href;
    var urlHash = this.hash;
    var parts = url.split('#');
    var trgt = parts[1];
    var target_offset = $('#' + trgt).offset();
    var target_top = target_offset.top;

    $('html, body').animate({
        scrollTop: target_top
    }, 500);
    if ($('nav.dots a').hasClass('active')) {
        $('nav.dots a').removeClass('active');
    }
    if (urlHash == '#section-1') {
        $('nav.dots a.scroll-1').addClass('active');
    }
    if (urlHash == '#section-2') {
        $('nav.dots a.scroll-2').addClass('active');
    }
    if (urlHash == '#section-3') {
        $('nav.dots a.scroll-3').addClass('active');
    }
    if (urlHash == '#section-4') {
        $('nav.dots a.scroll-4').addClass('active');
    }
});

$('nav.dots a').click(function() {
    if ($('nav.dots a').hasClass('active')) {
        $('nav.dots a').removeClass('active');
    }
    $(this).addClass('active');
});

$('.hamburger, nav.main ul li a').on('click', function(e) {
    e.preventDefault();
    $('.hamburger').toggleClass('is-open');
    $('nav.main ul').toggleClass('is-open');
});

$('.geekstudios, .scroll-2').mouseenter(function() {
    $('.hipster').addClass('show');
});
$('.geekstudios, .scroll-2').mouseleave(function() {
    $('.hipster').removeClass('show');
});
let data = [{
        "id": "1",
        "title": "THÔNG BÁO CHÀO MỪNG",
        "summary": "Chào mừng",
        "hasInput": false,
        "audio": "./audio/chao-mung.mp3"
    },
    {
        "id": "2",
        "title": "THÔNG BÁO PHỤ HUYNH TÌM BÉ",
        "summary": "Tìm bé",
        "content": "Kính thưa quý khách và các bé thân mến, Công viên nước hô ly e xin thông báo, Hiện nay, @parent đang tìm @child, Vậy @child đang ở đâu, vui lòng ghé khu vực cổng. Chúng tôi xin được phép nhắc lại: Hiện nay, @parent đang tìm @child, Vậy @child đang ở đâu, vui lòng ghé khu vực cổng, Xin chân thành cảm ơn.",
        "hasInput": true
    }

]

showSection()

function showSection() {
    let content = ""
    data.forEach(item => {
        content += `<section class="section-${item.id}" id="section-${item.id}">
                    <h2 class="title">${item.title}</h2>
                    
                    <button data-audio="${item.audio}" data-input="${item.hasInput}" data-content="${item.content}"  id="btn-${item.id}" onclick="speaker(${item.id})"  data-id=${item.id} class="button button--piyo btn-speaker" >
                    <div class="button__wrapper">
                        <span class="button__text">Bấm cái ni nè</span>
                    </div>
                    <div class="characterBox">
                        <div class="character wakeup">
                            <div class="character__face"></div>
                        </div>
                        <div class="character wakeup">
                            <div class="character__face"></div>
                        </div>
                        <div class="character">
                            <div class="character__face"></div>
                        </div>
                    </div>
                </button>
            
                </div>`
        if (item.hasInput) {
            content += `
            <div class="form__customer">
            <div class="form__group field">
                    <input type="input" class="form__field" placeholder="Tên phụ huynh" name="parent" id='parent-${item.id}' required />
                    <label for="parent" class="form__label">Tên phụ huynh</label>
                    
                  </div>
                  <div class="form__group field">
                    <input type="input" class="form__field" placeholder="Tên bé" name="child" id='child-${item.id}' required />
                    <label for="child" class="form__label">Tên bé</label>
                    
                  </div>
                  </div>
                 
                  `
        }
        content += `</section>`
    })
    $(".content").html(content)
}

function speaker(id) {

    let item = $(`#btn-${id}`)
    if (id == 1) {
        let url = item.data("audio")
        let audio = new Audio(url)
        audio.play()
    } else {
        let content = item.attr("data-content")
        let parent = $(`#parent-${id}`).val()
        let child = $(`#child-${id}`).val()
        if (!child || !parent) {
            Toastify({
                text: "Nhập tên kìa",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "-webkit-linear-gradient(to right, #8a2387, #e94057, #f27121)",
                    /* Chrome 10-25, Safari 5.1-6 */
                    background: "linear-gradient(to right, #8a2387, #e94057, #f27121)"
                        // background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function() {} // Callback after click
            }).showToast();
            return false
        } else {
            let content1 = content.replace(/@parent/g, parent)
            let text = content1.replace(/@child/g, child)
            const sentences = text.split(". ");
            // Đọc từng đoạn nhỏ
            let index = 0
            speakNextSentence(index, sentences)
            $(".form__field").val("")
        }
    }
}

function speakNextSentence(index, sentences) {
    if (index < sentences.length) {

        responsiveVoice.speak(sentences[index], "Vietnamese Female", {
            rate: 1.2,
            onend: () => {
                index++;
                setTimeout(() => {
                    speakNextSentence(index, sentences);
                }, 100)
            }
        });


    }
}