(() => {
  'use strict';
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => Array.from(root.querySelectorAll(s));
  const loader = $('#loader');
  let loaderFinished = false;
  function closeLoader(){if(loaderFinished)return;loaderFinished=true;loader?.classList.add('is-hidden');setTimeout(()=>loader?.remove(),900);}
  window.addEventListener('load',()=>setTimeout(closeLoader,460),{once:true});
  setTimeout(closeLoader,1900);
  const menu = $('#mobileMenu'), toggle=$('#mobileMenuToggle');
  function closeMenu(){menu.classList.remove('is-open');menu.setAttribute('aria-hidden','true');toggle.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');}
  toggle?.addEventListener('click',()=>{const open=!menu.classList.contains('is-open');menu.classList.toggle('is-open',open);menu.setAttribute('aria-hidden',String(!open));toggle.setAttribute('aria-expanded',String(open));document.body.classList.toggle('menu-open',open);});
  $$('#mobileMenu a').forEach(a=>a.addEventListener('click',closeMenu));
  const goalInput=$('#visitorGoal');
  function setGoal(goal){$$('.goal-card').forEach(card=>{const active=card.dataset.goal===goal;card.classList.toggle('is-selected',active);card.setAttribute('aria-pressed',String(active));});if(goalInput)goalInput.value=goal;}
  $$('.goal-card').forEach(btn=>btn.addEventListener('click',()=>setGoal(btn.dataset.goal)));
  const details={
    strength:{title:'Find your strength.',desc:'Build confidence with resistance training and progress at a pace that works for you.',img:'assets/train-alone.png',alt:'Man training with a dumbbell',goal:'Build Strength'},
    guided:{title:'Find your guidance.',desc:'Explore exercises, form and structure with support along the way.',img:'assets/coaching.png',alt:'Trainer guiding a gym member',goal:'Guided Training'},
    cardio:{title:'Find your rhythm.',desc:'Make more room for movement while building energy and stamina.',img:'assets/cardio.png',alt:'Members using cardio equipment',goal:'Fitness & Cardio'},
    recovery:{title:'Find your balance.',desc:'Make stretching, mobility and a sensible recovery routine part of training.',img:'assets/recovery.png',alt:'Fitness group stretching',goal:'Mobility & Recovery'}
  };
  function setDetail(key){const d=details[key];if(!d)return;$$('.detail-row').forEach(r=>{const active=r.dataset.detail===key;r.classList.toggle('is-current',active);r.setAttribute('aria-pressed',String(active));});$('#detailTitle').textContent=d.title;$('#detailDescription').textContent=d.desc;$('#detailImage').src=d.img;$('#detailImage').alt=d.alt;$('#detailNumber').textContent=`TRAINING PATH / ${String(Object.keys(details).indexOf(key)+1).padStart(2,'0')}`;if(goalInput)goalInput.value=d.goal;}
  $$('.detail-row').forEach(row=>row.addEventListener('click',()=>setDetail(row.dataset.detail)));
  const thumbMapping={'Strength Training':'strength','Guided Training':'guided','Fitness & Cardio':'cardio','Mobility & Recovery':'recovery'};
  $$('.programme-thumb').forEach(link=>link.addEventListener('click',()=>setDetail(thumbMapping[link.dataset.program])));
  $('#detailEnquire')?.addEventListener('click',()=>{document.getElementById('contact').scrollIntoView({behavior:'smooth'});$('#visitorName')?.focus({preventScroll:true});});
  $('#watchStory')?.addEventListener('click',()=>$('#more-studio')?.scrollIntoView({behavior:'smooth'}));
  const photos=$$('.gallery-card').map(btn=>({src:$('img',btn).getAttribute('src'),alt:$('img',btn).alt,caption:$('span',btn)?.textContent||''}));
  const lightbox=$('#lightbox');let currentIndex=0,focusReturn=null;
  const showPhoto=i=>{currentIndex=(i+photos.length)%photos.length;$('#lightboxImage').src=photos[currentIndex].src;$('#lightboxImage').alt=photos[currentIndex].alt;$('#lightboxCaption').textContent=`${String(currentIndex+1).padStart(2,'0')} / ${String(photos.length).padStart(2,'0')} — ${photos[currentIndex].caption}`;};
  function openLightbox(i){focusReturn=document.activeElement;showPhoto(i);lightbox.classList.add('is-open');lightbox.setAttribute('aria-hidden','false');document.body.classList.add('lightbox-open');$('.lightbox-close')?.focus();}
  function closeLightbox(){lightbox.classList.remove('is-open');lightbox.setAttribute('aria-hidden','true');document.body.classList.remove('lightbox-open');focusReturn?.focus();}
  $$('.gallery-card').forEach((b,i)=>b.addEventListener('click',()=>openLightbox(i)));
  $('.lightbox-close')?.addEventListener('click',closeLightbox);
  $('.lightbox-prev')?.addEventListener('click',()=>showPhoto(currentIndex-1));
  $('.lightbox-next')?.addEventListener('click',()=>showPhoto(currentIndex+1));
  lightbox?.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
  window.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();if(lightbox?.classList.contains('is-open'))closeLightbox();}if(lightbox?.classList.contains('is-open')){if(e.key==='ArrowRight')showPhoto(currentIndex+1);if(e.key==='ArrowLeft')showPhoto(currentIndex-1);}});
  const form=$('#enquiryForm');
  form?.addEventListener('submit',e=>{
    e.preventDefault();
    const name=$('#visitorName').value.trim(),phone=$('#visitorPhone').value.replace(/\D/g,'');
    if(name.length<2){$('#visitorName').setCustomValidity('Please enter at least two characters.');$('#visitorName').reportValidity();return;}
    $('#visitorName').setCustomValidity('');
    if(phone.length<10||phone.length>13){$('#visitorPhone').setCustomValidity('Please enter a valid phone number.');$('#visitorPhone').reportValidity();return;}
    $('#visitorPhone').setCustomValidity('');
    const message=`Hi Motion House, I'd like to enquire about a studio visit.\nName: ${name}\nPhone: ${phone}\nFitness goal: ${goalInput.value}\nPreferred time: ${$('#visitTime').value}\nQuestion: ${$('#visitorMessage').value.trim()||'Please tell me how to get started.'}`;
    $('#preparedMessage').value=message;$('#formResult').hidden=false;$('#formResult').scrollIntoView({behavior:'smooth',block:'nearest'});
  });
  $('#visitorName')?.addEventListener('input',e=>e.target.setCustomValidity(''));
  $('#visitorPhone')?.addEventListener('input',e=>e.target.setCustomValidity(''));
  $('#copyEnquiry')?.addEventListener('click',async()=>{const copyButton=$('#copyEnquiry');try{await navigator.clipboard.writeText($('#preparedMessage').value);copyButton.textContent='Copied';}catch{const text=$('#preparedMessage');text.select();copyButton.textContent='Select and copy the message';}setTimeout(()=>copyButton.textContent='Copy message',2100);});
})();
