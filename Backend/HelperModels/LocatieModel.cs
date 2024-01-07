using Backend.Models;

namespace Backend.HelperModels
{
    public class LocatieModel
    {
        public ushort IdLocatie { get; set; }

        public string Nume { get; set; } = null!;

        public string? Descriere { get; set; }

        public int? NumarRestaurante { get; set; }


        public LocatieModel(Tbllocatii locatie)
        {
            IdLocatie=locatie.IdLocatie;
            Nume=locatie.Nume;
            Descriere=locatie.Descriere;
            //Tblactivitati =locatie.Tblactivitatis.ToList();
            //Tblhoteluri =locatie.Tblhoteluris.ToList();
            //Tblrestaurante =locatie.Tblrestaurantes.ToList();
        }
    }
}
