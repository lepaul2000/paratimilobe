import tkinter as tk
from tkinter import messagebox
from PIL import Image, ImageTk
import os

class ValentineCard:
    def __init__(self, root):
        self.root = root
        self.root.title("Para ti mis ojitos lindos❤️")
        self.root.geometry("900x700")
        self.root.configure(bg="#FADCE6")
        
        self.answered = False
        
        # Título/mensaje principal
        title_label = tk.Label(
            root,
            text="Este tiempo contigo me ha hecho amarte cada vez más",
            font=("Arial", 18, "bold"),
            bg="#FADCE6",
            fg="#393D49",
            wraplength=800
        )
        title_label.pack(pady=30)
        
        # Subtitle
        subtitle_label = tk.Label(
            root,
            text="es por eso que quiero preguntarte...",
            font=("Arial", 16),
            bg="#FADCE6",
            fg="#393D49",
            wraplength=800
        )
        subtitle_label.pack(pady=10)
        
        # Pregunta grande
        question_label = tk.Label(
            root,
            text="¿Quieres ser mi San Valentín?",
            font=("Arial", 28, "bold"),
            bg="#FADCE6",
            fg="#E91E63"
        )
        question_label.pack(pady=30)
        
        # Cargar y mostrar imagen del gato
        try:
            img = Image.open('gato.gif')
            img.thumbnail((400, 300))
            photo = ImageTk.PhotoImage(img)
            
            image_label = tk.Label(root, image=photo, bg="#FADCE6")
            image_label.image = photo
            image_label.pack(pady=20)
        except:
            img_label = tk.Label(root, text="🐱", font=("Arial", 80), bg="#FADCE6")
            img_label.pack(pady=20)
        
        # Frame para los botones
        button_frame = tk.Frame(root, bg="#FADCE6")
        button_frame.pack(pady=30)
        
        # Botón Sí
        yes_button = tk.Button(
            button_frame,
            text="💚 Sí",
            font=("Arial", 16, "bold"),
            bg="#008F39",
            fg="white",
            padx=40,
            pady=15,
            command=self.on_yes,
            relief=tk.RAISED,
            bd=3
        )
        yes_button.pack(side=tk.LEFT, padx=20)
        
        # Botón No
        no_button = tk.Button(
            button_frame,
            text="❌ No",
            font=("Arial", 16, "bold"),
            bg="#FE0000",
            fg="white",
            padx=40,
            pady=15,
            command=self.on_no,
            relief=tk.RAISED,
            bd=3
        )
        no_button.pack(side=tk.LEFT, padx=20)
        
        # Label para la respuesta
        self.response_label = tk.Label(
            root,
            text="",
            font=("Arial", 24, "bold"),
            bg="#FADCE6",
            fg="#393D49"
        )
        self.response_label.pack(pady=20)
        
        # Label para imagen de respuesta
        self.image_response_label = tk.Label(root, bg="#FADCE6")
        self.image_response_label.pack(pady=10)
    
    def on_yes(self):
        if not self.answered:
            self.answered = True
            self.response_label.config(text="¡Yeii! Sabía que me aceptarías 💕", fg="#E91E63")
            
            # Intentar mostrar imagen del gatito
            try:
                img = Image.open('gatito.jpg')
                img.thumbnail((400, 300))
                photo = ImageTk.PhotoImage(img)
                self.image_response_label.config(image=photo)
                self.image_response_label.image = photo
            except:
                self.image_response_label.config(text="🎉😻🎉", font=("Arial", 80))
    
    def on_no(self):
        if not self.answered:
            self.answered = True
            self.response_label.config(text="pipipi :( 💔", fg="#FE0000")
            
            # Intentar mostrar imagen del hamster
            try:
                img = Image.open('hamster.jpg')
                img.thumbnail((400, 300))
                photo = ImageTk.PhotoImage(img)
                self.image_response_label.config(image=photo)
                self.image_response_label.image = photo
            except:
                self.image_response_label.config(text="😢🐹😢", font=("Arial", 80))

if __name__ == "__main__":
    root = tk.Tk()
    app = ValentineCard(root)
    root.mainloop()
