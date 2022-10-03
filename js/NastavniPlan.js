
  $( function() {    
    
    $( "#intxt" ).autocomplete({                // Za ovaj id odnosno za taj input povezujemo autocomplete sa tim sourcom 
      source: 'http://www.fulek.com/VUA/SUPIT/GetNastavniPlan', //i onda trazimo u tom sourcu ono sto je napisano u inputu preko tog id.value
      search: $('#intxt').val(),
      focus: (ev, ui) => {
          $("#intxt").val(ui.item.label)        //Kad se fokusiramo da pise naziv predmeta u inputu 
      },
      select: function(ev,ui){
          const id = ui.item.value;
            $.ajax({                            // sto je ajax?
                url: `http://www.fulek.com/VUA/supit/GetKolegij/${id}`,
                success: function(podaci) {
                    console.log(podaci);        //??
                    const{ects,id,kolegij,predavanja,sati,tip,vjezbe}=podaci;
                    UmetniUTablicu(ects,kolegij,predavanja,sati,tip,vjezbe, id);
                    $('#intxt').val('');        //kad stisnemo sa dropdown menija kolegiji koji zelimo da nam u inputu ne pise nista
                }                               //da maknemo odnosno da ga nema pisalo bi nam u inputu id od tog kolegija
            })
        }
    });

  } );

  function UmetniUTablicu(ects,kolegij,predavanja,sati,tip,vjezbe,id){
      $("table").find("tbody")                  //prvo se trazi nad tablicom tbody te se ode automatski
      .append($('<tr>')                         //stvara podatak u tablici. Ne treba u html pisat nista ka za thead
        .append($('<td>').text(kolegij))        //prvo se appenda red pa se za taj red lipe ostali podaci
        .append($('<td>').text(ects))           //bitan je redoslijed, kako idu stupci tako triba i ode
        .append($('<td>').text(sati))
        .append($('<td>').text(predavanja))
        .append($('<td>').text(vjezbe))
        .append($('<td>').text(tip))
        .append($('<td>').append($(`<button id="btn-${id}" class="delbtn">`).text("Obrisi"))));
        
        Izracun(ects,sati); 

        $(`#btn-${id}`).click(function(){       //pozivamo odredeni botun preko jedinstvenog id
            Skidanje(ects,sati);            
            console.log(this);                  //???
            $(this).parent().parent().remove();
        });
  }

  var UkupnoEcts=0;
  var UkupnoSati=0;

function Izracun(ects,sati){                    //funkcija preko koje izracunavamo ukupne bodove i sate
    UkupnoEcts+=ects;
    UkupnoSati+=sati;
    $("table").find("#ectsUkupno").text(UkupnoEcts)
    $("table").find("#satiUkupno").text(UkupnoSati)

}

function Skidanje(ects,sati){                   //funkcija preko koje skidamo bodove od predmeta kojeg smo obrisali i sate
    UkupnoEcts-=ects;
    UkupnoSati-=sati;
    $("table").find("#ectsUkupno").text(UkupnoEcts)
    $("table").find("#satiUkupno").text(UkupnoSati)
}