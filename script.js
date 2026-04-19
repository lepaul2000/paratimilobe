function answer(response) {
    const questionSection = document.getElementById('questionSection');
    const responseSection = document.getElementById('responseSection');
    const albumSection = document.getElementById('albumSection');
    const responseContent = document.getElementById('responseContent');

    // Ocultar sección de pregunta
    questionSection.style.display = 'none';

    if (response === 'yes') {
        // Mostrar sección de respuesta primero
        responseSection.style.display = 'block';
        responseContent.innerHTML = `
            <div class="response-message message-yes">
                Esos momentos contigo son lo más hermoso 💕
            </div>
            <img src="gatito.jpg" alt="Gatito feliz" class="response-image">
            <div class="reset-button">
                <button class="btn btn-yes" onclick="openAlbum()">
                    <span>📸 Ver Álbum de Recuerdos</span>
                </button>
                <button class="btn btn-no" onclick="location.reload()">
                    <span>🔄 Volver al inicio</span>
                </button>
            </div>
        `;
    } else if (response === 'no') {
        responseSection.style.display = 'block';
        responseContent.innerHTML = `
            <div class="response-message message-no">
                Mi amor por ti es infinito ∞ 💖
            </div>
            <img src="hamster.jpg" alt="Hamster triste" class="response-image">
            <div class="reset-button">
                <button class="btn btn-yes" onclick="location.reload()">
                    <span>🔄 Volver al inicio</span>
                </button>
            </div>
        `;
    }
}

function openAlbum() {
    const responseSection = document.getElementById('responseSection');
    const albumSection = document.getElementById('albumSection');
    
    responseSection.style.display = 'none';
    albumSection.style.display = 'block';
    
    loadPhotos();
}

function goBackToResponse() {
    const responseSection = document.getElementById('responseSection');
    const albumSection = document.getElementById('albumSection');
    
    albumSection.style.display = 'none';
    responseSection.style.display = 'block';
}

// Firebase Storage para fotos del álbum
let currentPhotoIndex = 0;
let carouselPhotos = [];
let currentCarouselUrl = null;
let backgroundAudio = null;
let musicEnabled = false;

function initBackgroundAudio() {
    if (backgroundAudio) return;
    backgroundAudio = new Audio('musiquita .wav');
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.3;
    backgroundAudio.addEventListener('error', function() {
        console.log('Audio no disponible');
    });
}

function updateMusicButton() {
    const btn = document.getElementById('musicToggleBtn');
    if (!btn) return;
    if (musicEnabled && backgroundAudio && !backgroundAudio.paused) {
        btn.innerHTML = '<span>🔊 Música ON</span>';
    } else {
        btn.innerHTML = '<span>🔇 Música OFF</span>';
    }
}

function toggleMusic() {
    initBackgroundAudio();
    if (!backgroundAudio) return;

    if (backgroundAudio.paused) {
        backgroundAudio.play().catch(() => console.log('No se pudo reproducir audio'));
        musicEnabled = true;
    } else {
        backgroundAudio.pause();
        musicEnabled = false;
    }
    updateMusicButton();
}

// Firebase Storage functions
async function uploadPhoto(file, index) {
    try {
        console.log('📤 Iniciando subida de:', file.name);
        const storageRef = ref(window.firebaseStorage, `album-photos/${Date.now()}_${index}_${file.name}`);
        console.log('📍 Referencia creada:', storageRef.fullPath);
        const snapshot = await uploadBytes(storageRef, file);
        console.log('✅ Foto subida:', snapshot.ref.fullPath);
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('🔗 URL obtenida');
        return {
            id: snapshot.ref.name,
            url: downloadURL,
            name: file.name,
            order: Date.now() + index
        };
    } catch (error) {
        console.error('❌ Error en uploadPhoto:', error.code, error.message);
        throw error;
    }
}

async function getAllPhotos() {
    try {
        const storageRef = ref(window.firebaseStorage, 'album-photos/');
        const result = await listAll(storageRef);

        const photos = [];
        for (const itemRef of result.items) {
            const url = await getDownloadURL(itemRef);
            const metadata = await getMetadata(itemRef);
            photos.push({
                id: itemRef.name,
                url: url,
                name: metadata.name,
                order: metadata.customMetadata?.order ? parseInt(metadata.customMetadata.order) : 0
            });
        }

        return photos.sort((a, b) => (a.order || 0) - (b.order || 0));
    } catch (error) {
        console.error('Error getting photos:', error);
        return [];
    }
}

async function deletePhotoFromStorage(photoId) {
    const photoRef = ref(window.firebaseStorage, `album-photos/${photoId}`);
    await deleteObject(photoRef);
}

async function updatePhotoOrder(photoId, newOrder) {
    // Firebase Storage no permite actualizar metadata fácilmente
    // Esta función se mantiene por compatibilidad pero no hace nada
    console.log('Order update not supported in Firebase Storage');
}

async function loadPhotos() {
    const gallery = document.getElementById('gallery');
    const uploadHint = document.getElementById('uploadHint');

    try {
        const photos = await getAllPhotos();
        gallery.innerHTML = '';
        uploadHint.textContent = `Haz clic para seleccionar fotos (${photos.length}/200)`;

        if (photos.length === 0) {
            gallery.innerHTML = '<div class="empty-gallery">No hay fotos aún. ¡Agrega algunas!</div>';
            return;
        }

        carouselPhotos = photos;

        photos.forEach((photo, index) => {
            const photoCard = document.createElement('div');
            photoCard.className = 'photo-card';

            const image = document.createElement('img');
            image.alt = `Foto ${index + 1}`;
            image.src = photo.url;
            image.addEventListener('click', function() {
                openCarousel(index);
            });

            photoCard.draggable = true;
            photoCard.addEventListener('dragstart', function(event) {
                event.dataTransfer.setData('text/plain', photo.id);
                event.dataTransfer.effectAllowed = 'move';
                photoCard.classList.add('dragging');
            });

            photoCard.addEventListener('dragend', function() {
                photoCard.classList.remove('dragging');
            });

            photoCard.addEventListener('dragover', function(event) {
                event.preventDefault();
                event.dataTransfer.dropEffect = 'move';
                photoCard.classList.add('drag-over');
            });

            photoCard.addEventListener('dragleave', function() {
                photoCard.classList.remove('drag-over');
            });

            photoCard.addEventListener('drop', function(event) {
                event.preventDefault();
                photoCard.classList.remove('drag-over');
                const sourceId = event.dataTransfer.getData('text/plain');
                const targetId = photo.id;
                if (sourceId && targetId && sourceId !== targetId) {
                    // Para Firebase, simplemente recargamos ya que el orden no se puede cambiar fácilmente
                    loadPhotos();
                }
            });

            const overlay = document.createElement('div');
            overlay.className = 'photo-overlay';

            const viewBtn = document.createElement('button');
            viewBtn.className = 'view-btn';
            viewBtn.textContent = '👁️ Ver';
            viewBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                openCarousel(index);
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'photo-delete';
            deleteBtn.textContent = '✕';
            deleteBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                deletePhotoFromStorage(photo.id).then(() => loadPhotos());
            });

            overlay.appendChild(viewBtn);
            photoCard.appendChild(image);
            photoCard.appendChild(deleteBtn);
            photoCard.appendChild(overlay);
            gallery.appendChild(photoCard);
        });
    } catch (error) {
        console.error('Error loading photos:', error);
        gallery.innerHTML = '<div class="empty-gallery">Error al cargar fotos. Revisa la configuración de Firebase.</div>';
    }
}

function openCarousel(index) {
    if (!carouselPhotos || carouselPhotos.length === 0) return;

    currentPhotoIndex = index;
    const modal = document.getElementById('carouselModal');
    const image = document.getElementById('carouselImage');

    if (currentCarouselUrl) {
        URL.revokeObjectURL(currentCarouselUrl);
        currentCarouselUrl = null;
    }

    currentCarouselUrl = carouselPhotos[currentPhotoIndex].url;
    image.src = currentCarouselUrl;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeCarousel() {
    const modal = document.getElementById('carouselModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';

    if (currentCarouselUrl && currentCarouselUrl.startsWith('blob:')) {
        URL.revokeObjectURL(currentCarouselUrl);
        currentCarouselUrl = null;
    }
}

function prevPhoto() {
    if (!carouselPhotos || carouselPhotos.length === 0) return;
    currentPhotoIndex = (currentPhotoIndex - 1 + carouselPhotos.length) % carouselPhotos.length;
    const image = document.getElementById('carouselImage');
    currentCarouselUrl = carouselPhotos[currentPhotoIndex].url;
    image.src = currentCarouselUrl;
}

function nextPhoto() {
    if (!carouselPhotos || carouselPhotos.length === 0) return;
    currentPhotoIndex = (currentPhotoIndex + 1) % carouselPhotos.length;
    const image = document.getElementById('carouselImage');
    currentCarouselUrl = carouselPhotos[currentPhotoIndex].url;
    image.src = currentCarouselUrl;
}

// Agregar fotos
document.addEventListener('DOMContentLoaded', async function() {
    // Esperar a que Firebase se inicialice
    const checkFirebase = () => {
        console.log('Checking Firebase...', {
            firebaseApp: !!window.firebaseApp,
            firebaseStorage: !!window.firebaseStorage,
            ref: !!window.ref,
            uploadBytes: !!window.uploadBytes
        });
        
        if (window.firebaseStorage) {
            console.log('✅ Firebase Storage listo');
            loadPhotos();
        } else {
            setTimeout(checkFirebase, 100);
        }
    };
    checkFirebase();

    const photoInput = document.getElementById('photoInput');
    photoInput.addEventListener('change', async function(e) {
        const files = Array.from(e.target.files);

        if (files.length === 0) return;

        try {
            // Subir todas las fotos a Firebase Storage
            const uploadPromises = files.map((file, index) => uploadPhoto(file, index));
            await Promise.all(uploadPromises);
            await loadPhotos();
            photoInput.value = '';
        } catch (error) {
            console.error('Error uploading photos:', error);
            alert('Error al subir las fotos. Revisa la configuración de Firebase.');
        }
    });

    initBackgroundAudio();
    updateMusicButton();

    document.addEventListener('click', function() {
        if (backgroundAudio && backgroundAudio.paused && musicEnabled) {
            backgroundAudio.play().catch(e => console.log('Audio no disponible'));
        }
    }, { once: true });
});
// Navegación con teclado
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('carouselModal');
    if (modal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            prevPhoto();
        } else if (e.key === 'ArrowRight') {
            nextPhoto();
        } else if (e.key === 'Escape') {
            closeCarousel();
        }
    }
});
