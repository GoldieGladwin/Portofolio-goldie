"use client"

import SectionHeading from '@/components/helper/SectionHeading'
import { FormEvent, useState } from 'react'
import { contactInfo, socialLinks } from '@/data'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { CheckCircle2, AlertCircle, LoaderCircle, Send } from 'lucide-react'

const Contact = () => {
    const [isSending, setIsSending] = useState(false)
    const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setStatus(null)
        setIsSending(true)

        const form = event.currentTarget
        const formData = new FormData(form)

        // Menggunakan Access Key Web3Forms dari .env.local atau key langsung
        const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'b229c66b-7d4b-4dd7-aab4-12071209fe19'
        formData.append('access_key', accessKey)
        formData.append('from_name', 'Portofolio Goldie Gladwin')

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json()

            if (data.success) {
                form.reset()
                setStatus({
                    type: 'success',
                    message: 'Pesan berhasil terkirim ke Gmail Goldie via Web3Forms! Terima kasih.',
                })
            } else {
                throw new Error(data.message || 'Gagal mengirim pesan via Web3Forms.')
            }
        } catch (error: any) {
            console.error('Web3Forms submit error:', error)
            setStatus({
                type: 'error',
                message: error.message || 'Gagal mengirim pesan. Silakan coba lagi nanti.',
            })
        } finally {
            setIsSending(false)
        }
    }

  return (
    <div id='contact' className='py-16 bg-gray-100 dark:bg-gray-600 scroll-mt-24'>
        <SectionHeading title_1='Get In' title_2='Touch' description='Have a project in mind or just want to say hi? I would love to hear from you.'
        />
        <div className='w-[80%] mx-auto'>
            <div className='grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto'>
                {/* contact info */}
                <div data-aos="fade-right" data-aos-anchor-placement="top-bottom" className=''>
                    <div className='space-y-8'>
                        <div>
                            <h3 className='text-2xl font-semibold mb-4'>Let&apos;s Talk</h3>
                            <p className='text-muted-foreground'>I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>

                        </div>
                        <div className='space-y-4'>
                            {contactInfo.map((item)=> {
                                return <a href={item.href} key={item.label} target="_blank" className='flex items-center gap-4 p-4 bg-white dark:bg-gray-800 shadow-md rounded-xl hover:scale-105 transition-all duration-300 group'>
                                    <div className='w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors'>
                                    <item.icon className='w-5 h-5 text-blue-500 dark:text-white'/>
                                    </div>
                                    <div>
                                        <p className='text-sm text-muted-foreground'>{item.label}</p>
                                        <p>{item.value}</p>
                                    </div>
                                </a>
                            })}
                        </div>
                        {/* social icons */}
                        <div>
                            <h4 className='text-lg font-medium mb-4'>Follow Me</h4>
                            <div className='flex gap-3'>
                                {socialLinks.map((link)=> {
                                    return <a href={link.href} key={link.label} target="_blank" className='w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-muted-foreground hover:text-blue-500 transition-colors'>

                                        <link.icon className='w-5 h-5'/>
                                    </a>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                {/* contact form */}
                <div data-aos="fade-left" data-aos-delay="60" data-aos-anchor-placement="top-bottom">
                    <form onSubmit={handleSubmit} className='bg-white dark:bg-gray-800 rounded-2xl p-8 space-y-6'>
                        <div className='grid sm:grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                                <label htmlFor='name' className='text-sm font-medium '>
                                    Name
                                    </label>
                                    <Input id="name" name='name' placeholder='Your Name' required className='bg-gray-100 dark:bg-gray-700/60 dark:text-white'/>
                            </div>
                            <div className='space-y-2'>
                                <label htmlFor='email' className='text-sm font-medium'>
                                    Email
                                </label>
                                <Input id="email" name='email' type='email' placeholder='your.email@example.com' required className='bg-gray-100 dark:bg-gray-700/60 dark:text-white'/>
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor='subject' className='text-sm font-medium'>Subject</label>
                            <Input id='subject' name='subject' placeholder='Project Inquiry / Greeting' required className='bg-gray-100 dark:bg-gray-700/60 dark:text-white'/>
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor='message' className='text-sm font-medium'>Message</label>
                            <Textarea id='message' name='message' placeholder='Tell me about your project or send a message...'
                            rows={5} required className='bg-gray-100 dark:bg-gray-700/60 dark:text-white h-36'/>
                        </div>
                        {status && (
                            <div
                                role='status'
                                className={`flex items-start gap-2.5 p-4 rounded-xl text-xs sm:text-sm font-medium border ${
                                    status.type === 'success'
                                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                                        : 'bg-red-50 text-red-800 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800'
                                }`}
                            >
                                {status.type === 'success' ? (
                                    <CheckCircle2 className='w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5' />
                                ) : (
                                    <AlertCircle className='w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5' />
                                )}
                                <span>{status.message}</span>
                            </div>
                        )}
                        <Button type='submit' size={"lg"} className="w-full cursor-pointer" disabled={isSending}>
                            {isSending ? <LoaderCircle className='w-4 h-4 mr-2 animate-spin' /> : <Send className='w-4 h-4 mr-2' />}
                            {isSending ? 'Sending...' : 'Send Message'}
                        </Button>
                        
                    </form>
                </div>
            </div>
        </div>
        </div>
  )
}

export default Contact