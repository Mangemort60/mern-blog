const fullToolbarOptions = {
  toolbar: [
    // Blocs de formatage de texte
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],

    // En-têtes
    [{ header: 1 }, { header: 2 }],
    [{ font: [] }],

    // Alignements
    [{ align: [] }],

    // Listes
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],

    // Couleurs
    [{ color: [] }, { background: [] }],

    // Polices et tailles de police
    [{ font: [] }],
    [{ size: ['small', false, 'large', 'huge'] }],

    // Liens et images
    ['link'],

    // Nettoyer le formatage
    ['clean'],
  ],
};

export default fullToolbarOptions;
