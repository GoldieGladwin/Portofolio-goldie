"use client"

import SectionHeading from '@/components/helper/SectionHeading'
import emailjs from '@emailjs/browser'
import { FormEvent, useState } from 'react'
import { contactInfo, socialLinks } from '@/data'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { LoaderCircle, Send } from 'lucide-react'

const Contact = () => {
    const [isSending, setIsSending] = useState(false)
    const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setStatus(null)

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

        if (!serviceId || !templateId || !publicKey) {
            setStatus({
                type: 'error',
                message: 'Email service is not configured yet. Please try again later.',
            })
            return
        }

        setIsSending(true)

        try {
            await emailjs.sendForm(serviceId, templateId, event.currentTarget, { publicKey })
            event.currentTarget.reset()
            setStatus({ type: 'success', message: 'Message sent successfully. Thank you!' })
        } catch (error) {
            console.error('EmailJS error:', error)
            setStatus({
                type: 'error',
                message: 'Unable to send your message. Please try again.',
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
                                    <Input id="name" name='user_name' placeholder='Goldie Gladwin' required className='bg-gray-100'/>
                            </div>
                            <div className='space-y-2'>
                                <label htmlFor='email' className='text-sm font-medium '>
                                    Email
                                    </label>
                                    <Input id="email" name='user_email' type='email' placeholder='Goldie@example.com' required className='bg-gray-100'/>
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor='subject' className='text-sm font-medium'>Subject</label>
                            <Input id='subject' name='subject' placeholder='Project Inquiry' required className='bg-gray-100'/>
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor='message' className='text-sm font-medium'>Message</label>
                            <Textarea id='message' name='message' placeholder='Tell me about your project......'
                            rows={5} required className='bg-gray-100 h-40'/>
                        </div>
                        {status && (
                            <p role='status' className={status.type === 'success' ? 'text-sm text-green-600' : 'text-sm text-red-600'}>
                                {status.message}
                            </p>
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