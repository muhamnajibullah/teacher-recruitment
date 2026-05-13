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

  // State untuk menandai index soal yang sedang ditampilkan.
  const [questionIndex, setQuestionIndex] = useState(0)

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
  const handleSelectAnswer = (option) => {
    const activeQuestion = questionBank[questionIndex]
    setAnswers((prev) => ({ ...prev, [activeQuestion.id]: option }))
  }

  /**
   * Navigasi ke soal berikutnya saat tombol Next diklik.
   */
  const handleNextQuestion = () => {
    setQuestionIndex((prev) => (prev < questionBank.length - 1 ? prev + 1 : prev))
  }

  /**
   * Navigasi ke soal sebelumnya saat tombol Back diklik.
   */
  const handlePrevQuestion = () => {
    setQuestionIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  /**
   * Kembali dari halaman Selection Test ke Login Page.
   */
  const handleBackToLogin = () => {
    setActivePage('login')
  }

  const activeQuestion = questionBank[questionIndex]
  const selectedAnswer = answers[activeQuestion.id]

  return (
    <main className="app-shell">
      {activePage === 'login' ? (
        <section className="login-page">
          <div className="login-left">
            <img className="brand-mark" src="/assets/logo-alazhar.webp" alt="Logo Alazka" />
            <h1>Teacher Application Form</h1>
            <p className="subtitle">
              Complete your information to apply as teacher in our system.
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
            <div className="container-footer">
              <span className="footer-left">© 2025 Divisi Pengembangan Alazka</span>
              <span className="footer-right">Contact Us</span>
            </div>
          </div>

          <div className="login-right">
            <img
              className="right-hero-logo"
              src="/assets/logo-vertikal.png"
              alt="Logo Alazka Vertical"
            />
          </div>
        </section>
      ) : (
        <section className="test-page">
          <header className="test-navbar">
            <div>
              <p className="top-label">Selection Test</p>
              <h2>Alazka Recruit</h2>
            </div>

            <div className="profile-box">
              <div className="profile-text">
                <strong>{formData.fullname}</strong>
                <span>Guest Teacher</span>
              </div>
              <div className="profile-avatar">{profileAlias}</div>
            </div>
          </header>

          <div className="test-content">
            <button type="button" className="back-icon-button" onClick={handleBackToLogin}>
              ←
            </button>

            <p className="test-title">
              Selection Test "{formData.education}" Teacher "{formData.course}" • Al-Azhar Kelapa Gading
            </p>

            <div className="candidate-info">
              <strong>{formData.fullname}</strong>
              <span>{formData.email}</span>
            </div>

            <article className="question-card">
              <p className="question-number">
                Question {questionIndex + 1} of {questionBank.length}
              </p>
              <h3>{activeQuestion.question}</h3>

              <div className="answer-list">
                {activeQuestion.options.map((option) => (
                  <label key={option} className="answer-item">
                    <input
                      type="radio"
                      name={`question-${activeQuestion.id}`}
                      checked={selectedAnswer === option}
                      onChange={() => handleSelectAnswer(option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </article>

            <div className="navigation-buttons">
              <button
                type="button"
                className="nav-button secondary"
                onClick={handlePrevQuestion}
                disabled={questionIndex === 0}
              >
                Back
              </button>
              <button
                type="button"
                className="nav-button primary"
                onClick={handleNextQuestion}
                disabled={questionIndex === questionBank.length - 1}
              >
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
