let page_total, projet_total

let getProjectPerPage = (page) => {
    let xhr = new XMLHttpRequest;
    let response = null
    let search = document.getElementById('search')
    if (search != null && search.value != '')
        xhr.open('GET', 'https://cicd-gitlab.rp-ocn.apps.ocn.infra.ftgroup/api/v4/search?scope=projects&search=' + search.value)
    else
        xhr.open('GET', 'https://cicd-gitlab.rp-ocn.apps.ocn.infra.ftgroup/api/v4/projects?per_page=20&page=' + page)
    xhr.setRequestHeader("private-Token", "");
    xhr.onreadystatechange = () => {

        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                response = JSON.parse(xhr.response)
                console.log(response)
                page_total = xhr.getResponseHeader('x-total-pages')
                projet_total = xhr.getResponseHeader('x-total')
                let tbody = document.getElementById('tab_body')
                tbody.innerHTML = ''
                let tr, td, text
                let array = ['id', 'name', 'web_url','name_with_namespace']
                response.forEach(elt => {
                    tr = document.createElement('tr')
                    tbody.appendChild(tr)
                    for (let index = 0; index < 4; index++) {
                        td = document.createElement('td')
                        if (index == 4)
                            text = (elt.tag_list.length == 0) ? document.createTextNode('None') : document.createTextNode(elt[array[index]].join(' - '))
                        else
                            text = document.createTextNode(elt[array[index]])
                        tr.appendChild(td)
                        td.appendChild(text)
                    }                              
                });
                createPagButton()
            }    
            else { 
                console.log('false')
            }
        }
    }
    xhr.send(null)
}

let createPagButton = () => {
    let pagButton = document.getElementById('pag_button')
    pagButton.innerHTML = ''
    console.log(pagButton)
    console.log(page_total)
    for (let index = 0; index < page_total; index++) {
        pagButton.innerHTML += '<button type="button" class="page-btn" onclick=(setPage(\'' + (index + 1) + '\'))>' + (index + 1) + '</button>&nbsp;&nbsp;'
    }
}

let createPreviewPage = () => {
    let previewPage = document.getElementById('preview-page')
    previewPage.innerHTML = ''
    for (let index = 0; index < page_total; index++) {
        previewPage.innerHTML += ''
    } 
}

let setPage = (page) => {
    console.log('in set page : ', page)
    getProjectPerPage(page)
}
getProjectPerPage(1)