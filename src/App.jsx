import { useMemo, useState } from 'react'
import './App.css'
import logo from "./assets/logo-alazhar.webp"
import logovertikal from "./assets/logo-vertikal.png"

const educationOptions = ['SD', 'SMP', 'SMA/SMK', 'D1', 'D2', 'D3', 'D4', 'S1', 'S2', 'S3']
const courseOptions = ['Matematika', 'Bahasa Inggris', 'Fisika', 'Kimia', 'Biologi']

/**
 * Kumpulan data soal tes untuk halaman Selection Test.
 * Struktur ini dipakai untuk menampilkan soal secara dinamis.
 */
const questionBank = [
  {
    id: 1,
    question:
      'Diketahui barisan aritmetika dengan suku pertama 5 dan beda 3. Nilai suku ke-10 adalah...',
    options: ['30', '32', '35', '38'],
  },
  {
    id: 2,
    question:
      'Dalam kelas Bahasa Inggris, antonim paling tepat dari kata "Generous" adalah...',
    options: ['Helpful', 'Kind', 'Selfish', 'Friendly'],
  },
  {
    id: 3,
    question: 'Proses perubahan zat cair menjadi gas disebut...',
    options: ['Membeku', 'Menguap', 'Mencair', 'Menyublim'],
  },
  {
    id: 4,
    question:
      'Jika 3x + 5 = 20, maka nilai x adalah...',
    options: ['3', '4', '5', '6'],
  },
  {
    id: 5,
    question:
      'Sinonim kata "Cermat" yang paling tepat adalah...',
    options: ['Lalai', 'Teliti', 'Cepat', 'Keras'],
  },
  {
    id: 6,
    question:
      'Hasil dari 12 × 8 adalah...',
    options: ['86', '92', '96', '108'],
  },
  {
    id: 7,
    question:
      'Planet yang dikenal sebagai planet merah adalah...',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturnus'],
  },
  {
    id: 8,
    question:
      'Dalam Bahasa Inggris, bentuk lampau (past tense) dari kata "go" adalah...',
    options: ['goed', 'gone', 'went', 'going'],
  },
  {
    id: 9,
    question:
      'Peristiwa perubahan uap air menjadi titik-titik air disebut...',
    options: ['Evaporasi', 'Kondensasi', 'Sublimasi', 'Presipitasi'],
  },
  {
    id: 10,
    question:
      'Nilai rata-rata dari 6, 8, 10, dan 12 adalah...',
    options: ['8', '9', '10', '11'],
  },
]

/**
 * Fungsi utama aplikasi.
 * Mengelola alur antar halaman (login -> test), data form, dan jawaban soal.
 */
function App() {
  // State untuk mengontrol halaman aktif.
  const [activePage, setActivePage] = useState('login')

  // State untuk menampung data form login.
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    education: '',
    course: '',
  })

  // State untuk menampung jawaban user per id soal.
  const [answers, setAnswers] = useState({})

  /**
   * Menghasilkan inisial nama untuk avatar profile di navbar Selection Test.
   */
  const profileAlias = useMemo(() => {
    if (!formData.fullname.trim()) return 'GA'
    return formData.fullname
      .trim()
      .split(' ')
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase() || '')
      .join('')
  }, [formData.fullname])

  /**
   * Menangani perubahan input/selection pada form login.
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  /**
   * Menvalidasi form lalu memindahkan user dari Login Page ke Selection Test Page.
   */
  const handleStartTest = (event) => {
    event.preventDefault()

    const isValid =
      formData.fullname.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      formData.education &&
      formData.course

    if (!isValid) {
      alert('Mohon lengkapi seluruh data sebelum memulai tes.')
      return
    }

    setActivePage('test')
  }

  /**
   * Menyimpan jawaban berdasarkan soal aktif.
   */
  const handleSelectAnswer = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }))
  }

  /**
   * Placeholder aksi ketika tombol Next diklik pada halaman semua soal.
   */
  const handleNextQuestion = () => {
    alert('Jawaban tersimpan. Lanjut ke tahap berikutnya.')
  }

  /**
   * Kembali ke halaman login saat tombol Back diklik.
   */
  const handlePrevQuestion = () => {
    handleBackToLogin()
  }

  /**
   * Kembali dari halaman Selection Test ke Login Page.
   */
  const handleBackToLogin = () => {
    setActivePage('login')
  }

  return (
    <main className="app-shell">
      {activePage === 'login' ? (
        <section className="login-page">
          <div className="login-left">
            <div className="img-start">
              <img className="brand-mark" src={logo} alt="Logo Alazka" />
              <h1>Teacher Application Form</h1>
              <p className="subtitle">
                Complete your information to apply as teacher in our system
              </p>
              <div className="separator" />

              <form className="form-area" onSubmit={handleStartTest}>
                <label htmlFor="fullname">Full Name</label>
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  placeholder="Enter your fullname"
                />

                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />

                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />

                <label htmlFor="education">Education Level</label>
                <select
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                >
                  <option value="">Select education level</option>
                  {educationOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <label htmlFor="course">Course</label>
                <select id="course" name="course" value={formData.course} onChange={handleInputChange}>
                  <option value="">Select Available Course</option>
                  {courseOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <button type="submit" className="start-button">
                  Start Test
                </button>
              </form>
            </div>
            <div className="container-footer">
              <span className="footer-left">© 2025 Divisi Pengembangan Alazka</span>
              <span className="footer-right">Contact Us</span>
            </div>
          </div>

          <div className="login-right">
            <img
              className="right-hero-logo"
              src={logovertikal}
              alt="Logo Alazka Vertical"
            />
          </div>
        </section>
      ) : (
        <section className="test-page">
          <header className="test-navbar">
            <div className="top-label">
              <h2>Selection Test</h2>
              <p>Alazka Recruit</p>
            </div>

            <div className="profile-box">
              <div className="profile-text">
                <strong>{formData.fullname}</strong>
                <div>
                  <span className="profile-role">Guest</span>
                  <span>Teacher</span>
                </div>
              </div>

              <div className="profile-avatar">{profileAlias}</div>
            </div>
          </header>

          <div className="test-content">
            <button type="button" className="back-icon-button" onClick={handleBackToLogin}>
              ←
            </button>

            <p className="test-title">
              Selection Test Teacher {formData.course} • Al-Azhar Kelapa Gading
            </p>

            <div className="candidate-info">
              <strong>{formData.fullname}</strong>
              <span>{formData.email}</span>
            </div>

            <article className="question-card all-questions-card">
              {questionBank.map((question, index) => {
                const selectedAnswer = answers[question.id]
                return (
                  <section key={question.id} className="question-block">
                    <p className="question-number">{index + 1}. {question.question}</p>

                    <div className="answer-list">
                      {question.options.map((option, optionIndex) => (
                        <label key={option} className="answer-item">
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            checked={selectedAnswer === option}
                            onChange={() => handleSelectAnswer(question.id, option)}
                          />
                          <span>{String.fromCharCode(65 + optionIndex)}. {option}</span>
                        </label>
                      ))}
                    </div>
                  </section>
                )
              })}
            </article>

            <div className="navigation-buttons sticky-navigation">
              <button
                type="button"
                className="nav-button secondary"
                onClick={handlePrevQuestion}
              >
                Back
              </button>
              <button type="button" className="nav-button primary" onClick={handleNextQuestion}>
                Next
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

export default App
