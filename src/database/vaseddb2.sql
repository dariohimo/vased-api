--
-- PostgreSQL database dump
--

-- Dumped from database version 12.10 (Ubuntu 12.10-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.10 (Ubuntu 12.10-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.answers (
    id integer NOT NULL,
    answer_text text,
    feedback text,
    score integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userTaskClassroomId" integer
);


ALTER TABLE public.answers OWNER TO postgres;

--
-- Name: answers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.answers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.answers_id_seq OWNER TO postgres;

--
-- Name: answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.answers_id_seq OWNED BY public.answers.id;


--
-- Name: classrooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.classrooms (
    id integer NOT NULL,
    capacity integer,
    name character varying(255) NOT NULL,
    code character varying(255),
    "adminDescription" text NOT NULL,
    description text NOT NULL,
    "endsAt" date,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "createdBy" integer
);


ALTER TABLE public.classrooms OWNER TO postgres;

--
-- Name: classrooms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.classrooms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.classrooms_id_seq OWNER TO postgres;

--
-- Name: classrooms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.classrooms_id_seq OWNED BY public.classrooms.id;


--
-- Name: dniTypes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."dniTypes" (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public."dniTypes" OWNER TO postgres;

--
-- Name: dniTypes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."dniTypes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."dniTypes_id_seq" OWNER TO postgres;

--
-- Name: dniTypes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."dniTypes_id_seq" OWNED BY public."dniTypes".id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: task_classrooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task_classrooms (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "taskId" integer,
    "classroomId" integer,
    "createdBy" integer
);


ALTER TABLE public.task_classrooms OWNER TO postgres;

--
-- Name: task_classrooms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.task_classrooms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.task_classrooms_id_seq OWNER TO postgres;

--
-- Name: task_classrooms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.task_classrooms_id_seq OWNED BY public.task_classrooms.id;


--
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    code integer,
    description text,
    "baseScore" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "createdBy" integer
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tasks_id_seq OWNER TO postgres;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: user_classrooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_classrooms (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer,
    "classroomId" integer
);


ALTER TABLE public.user_classrooms OWNER TO postgres;

--
-- Name: user_classrooms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_classrooms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_classrooms_id_seq OWNER TO postgres;

--
-- Name: user_classrooms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_classrooms_id_seq OWNED BY public.user_classrooms.id;


--
-- Name: user_task_classrooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_task_classrooms (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "taskClassroomId" integer,
    "userId" integer,
    "createdBy" integer
);


ALTER TABLE public.user_task_classrooms OWNER TO postgres;

--
-- Name: user_task_classrooms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_task_classrooms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_task_classrooms_id_seq OWNER TO postgres;

--
-- Name: user_task_classrooms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_task_classrooms_id_seq OWNED BY public.user_task_classrooms.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    names character varying(255) NOT NULL,
    "lastNames" character varying(255) NOT NULL,
    dni integer,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "birthDate" timestamp with time zone,
    city character varying(255),
    country character varying(255),
    "lastLogin" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "roleId" integer,
    "dniTypeId" integer
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: answers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers ALTER COLUMN id SET DEFAULT nextval('public.answers_id_seq'::regclass);


--
-- Name: classrooms id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classrooms ALTER COLUMN id SET DEFAULT nextval('public.classrooms_id_seq'::regclass);


--
-- Name: dniTypes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."dniTypes" ALTER COLUMN id SET DEFAULT nextval('public."dniTypes_id_seq"'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: task_classrooms id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_classrooms ALTER COLUMN id SET DEFAULT nextval('public.task_classrooms_id_seq'::regclass);


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Name: user_classrooms id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_classrooms ALTER COLUMN id SET DEFAULT nextval('public.user_classrooms_id_seq'::regclass);


--
-- Name: user_task_classrooms id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_task_classrooms ALTER COLUMN id SET DEFAULT nextval('public.user_task_classrooms_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.answers (id, answer_text, feedback, score, "createdAt", "updatedAt", "userTaskClassroomId") FROM stdin;
\.


--
-- Data for Name: classrooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.classrooms (id, capacity, name, code, "adminDescription", description, "endsAt", "createdAt", "updatedAt", "createdBy") FROM stdin;
1	10	Brian Barnett	185112	Focus race kind daughter position. Hundred provide five material imagine try. Enough mean last certain.	Born mean main matter hear.\nState send forget change west. Exactly my measure sometimes color artist.\nGoal design send cup director require.	2022-10-30	2022-05-24 12:01:04.766-05	2022-05-24 12:01:04.766-05	1
2	25	Charles Sanders	840176	Major rule moment build successful here spring. Student them peace season piece race dinner. Identify daughter practice eat detail parent.	Despite value oil value special. National fast hour space forget computer radio decade. Five field various education none.\nInstead total arm down example. Theory buy word game sport.	2022-05-28	2022-05-24 12:01:04.804-05	2022-05-24 12:01:04.804-05	1
3	13	Jillian Kennedy	7472	Couple radio security human consumer participant with. On institution response technology home group. Turn try whose. Dinner thing least worry can order.	Worry require reach wife sister could.\nSave these adult bill debate. Road fund price drug western million goal culture.	2022-07-04	2022-05-24 12:01:04.836-05	2022-05-24 12:01:04.836-05	1
4	25	Kathleen Perez	22250	Travel continue per poor when quickly threat organization. Hot you establish size seven value next. Rather hair today happy.\nCenter knowledge as oil.\nNear across company evening understand.	Heart section friend blood take industry. Window couple improve good sport no six. Walk daughter affect.\nExpect reduce difficult buy only each most different. Just election poor catch.	2022-06-14	2022-05-24 12:01:04.864-05	2022-05-24 12:01:04.864-05	1
5	29	Tina Hall	360004	Economic party boy describe north. Thank or course seven loss pay. Situation senior bar fly soon.	Part central decide between. Doctor place consider treat. Measure across evidence rate writer sometimes. Especially opportunity open.	2022-10-23	2022-05-24 12:01:04.883-05	2022-05-24 12:01:04.883-05	1
6	17	Nicole Chen	956838	Street improve like money head my stage expert. Field kid deep health continue compare. Deep simply prepare manage.	Fast accept give administration both. Either back general admit. Many television enough impact could choice list.	2022-06-27	2022-05-24 12:01:35.56-05	2022-05-24 12:01:35.56-05	2
7	30	Frank Bauer	226643	Admit security upon others individual bill board. Also option through card organization anything. Lead finally west play help month capital.	Culture firm apply field. Product plant religious might spend trip join. Yet a trade.\nCouple author recent write. Party discussion possible forget future common.	2022-11-01	2022-05-24 12:01:35.599-05	2022-05-24 12:01:35.599-05	2
8	27	Mikayla Nichols	877447	Debate under buy allow dinner pressure. Step you physical case parent check participant point. Third fish learn size tonight always international often.	Growth past left blood rise in especially. Rich project response stand.\nStructure skill give. Already half allow institution another when. Institution west generation develop the.	2022-09-23	2022-05-24 12:01:35.626-05	2022-05-24 12:01:35.626-05	2
9	27	Leonard Koch	952765	Attack out writer crime nice how. Fine gas tree yes reveal fund clearly. Artist letter represent across reason knowledge.	Live open sense someone fall where place word. Stop around message particular hear budget. Hour stand person high.	2022-10-03	2022-05-24 12:01:35.65-05	2022-05-24 12:01:35.65-05	2
10	19	Michael Ballard	386928	After family impact law. Oil simply ok religious store country south.\nIndeed step remember enjoy parent. Entire including page mention discuss.	Own situation form general order rest. Manager although image like miss soldier matter. Be condition born democratic stand entire recognize. Third party citizen six agree total here.	2022-08-03	2022-05-24 12:01:35.662-05	2022-05-24 12:01:35.662-05	2
11	21	Ryan Mueller	697627	Bit summer better agree everyone. Fight above increase personal area occur.\nMagazine style tonight indeed. Sense appear institution seem. Again improve down. Wonder rate in generation write onto.	Player face national again return wish. Study share agency perform tax later tough.\nParent party man site time every standard similar. Situation relate seat traditional.	2022-10-11	2022-05-24 12:01:57.106-05	2022-05-24 12:01:57.106-05	5
12	19	Christina Garner	936533	Trouble push three food listen. Piece nor finally case choice whatever. Life star memory parent.	Why throughout order figure traditional expect truth. Answer responsibility trade behind oil. Feeling statement push film college them loss join.	2022-07-06	2022-05-24 12:01:57.138-05	2022-05-24 12:01:57.138-05	5
13	14	Mrs. Erika Henderson MD	990882	Skill guess theory. This and paper letter data door serve.\nRecord tough could social smile. Herself network source.	Across daughter few ago operation. Billion four note talk already around may. Catch point wait plant letter plan production.	2022-06-20	2022-05-24 12:01:57.156-05	2022-05-24 12:01:57.156-05	5
\.


--
-- Data for Name: dniTypes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."dniTypes" (id, name) FROM stdin;
1	cc
2	ce
3	pa
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name) FROM stdin;
1	admin
2	teacher
3	student
\.


--
-- Data for Name: task_classrooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.task_classrooms (id, "createdAt", "updatedAt", "taskId", "classroomId", "createdBy") FROM stdin;
1	2022-05-24 14:39:07.281-05	2022-05-24 14:39:07.281-05	10	8	\N
2	2022-05-24 14:39:07.308-05	2022-05-24 14:39:07.308-05	1	1	\N
3	2022-05-24 14:39:07.325-05	2022-05-24 14:39:07.325-05	3	6	\N
4	2022-05-24 14:39:07.353-05	2022-05-24 14:39:07.353-05	6	6	\N
5	2022-05-24 14:39:07.383-05	2022-05-24 14:39:07.383-05	6	2	\N
6	2022-05-24 14:39:07.436-05	2022-05-24 14:39:07.436-05	3	11	\N
7	2022-05-24 14:39:07.48-05	2022-05-24 14:39:07.48-05	9	10	\N
8	2022-05-24 14:39:07.524-05	2022-05-24 14:39:07.524-05	1	2	\N
9	2022-05-24 14:39:07.586-05	2022-05-24 14:39:07.586-05	5	12	\N
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (id, name, code, description, "baseScore", "createdAt", "updatedAt", "createdBy") FROM stdin;
1	Chris Gonzalez	472282	May toward television spend cost happy recently. Firm admit situation loss structure. Serious account red something remain.	5	2022-05-24 14:34:07.354-05	2022-05-24 14:34:07.354-05	\N
2	David Miller	238078	Ago only like end consider appear. Deal Mrs prove note often lawyer realize. Manage however over defense marriage.	6	2022-05-24 14:34:07.393-05	2022-05-24 14:34:07.393-05	\N
3	Madison Brown	778079	Involve training effort small situation although south. Particularly section since spring also three.	4	2022-05-24 14:34:07.413-05	2022-05-24 14:34:07.413-05	\N
4	Travis Kim	75751	You so happy politics sport. Character foot wind shake impact father appear. Republican throughout consider leave model born like.	1	2022-05-24 14:34:07.431-05	2022-05-24 14:34:07.431-05	\N
5	Susan Kelly	369240	Above moment allow heart offer admit four discuss. Attention interesting study back face exactly. Time Democrat individual sport small front letter tough.	10	2022-05-24 14:34:07.462-05	2022-05-24 14:34:07.462-05	\N
6	Carmen Jacobs	716655	Truth four threat leader toward nation. Anything Congress part girl note. Or herself high big stay quite significant.\nOn send in our. Nothing down at product store rate.	7	2022-05-24 14:34:07.478-05	2022-05-24 14:34:07.478-05	\N
7	Heather Larsen	44773	Hit present woman so. Fly image different guy away. Increase require color though pattern build organization difference.\nDesign the create opportunity. House feel economy production.	5	2022-05-24 14:34:07.507-05	2022-05-24 14:34:07.507-05	\N
8	Katie Wells	295054	Foot system yourself week. Six control four daughter possible try explain. Talk couple happen three hope official.	4	2022-05-24 14:34:07.522-05	2022-05-24 14:34:07.522-05	\N
9	Jamie Jarvis	43918	Training best present everyone simple this scene there. Listen turn threat black health cause week. Fight summer lot shoulder century staff early.\nFall approach short fish. Performance issue news.	1	2022-05-24 14:34:07.55-05	2022-05-24 14:34:07.55-05	\N
10	Lisa Smith	687819	Method already question. Least network structure month turn former degree onto.\nStore step recently forget local when effort.\nEach teach time few long at.	8	2022-05-24 14:34:07.582-05	2022-05-24 14:34:07.582-05	\N
\.


--
-- Data for Name: user_classrooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_classrooms (id, "createdAt", "updatedAt", "userId", "classroomId") FROM stdin;
1	2022-05-24 12:23:12.516-05	2022-05-24 12:23:12.516-05	3	12
2	2022-05-24 12:25:43.909-05	2022-05-24 12:25:43.909-05	4	2
3	2022-05-24 12:26:59.208-05	2022-05-24 12:26:59.208-05	12	3
4	2022-05-24 12:28:43.213-05	2022-05-24 12:28:43.213-05	1	8
5	2022-05-24 12:28:43.277-05	2022-05-24 12:28:43.277-05	16	11
6	2022-05-24 12:28:43.305-05	2022-05-24 12:28:43.305-05	2	8
7	2022-05-24 12:28:43.363-05	2022-05-24 12:28:43.363-05	11	5
8	2022-05-24 12:28:43.401-05	2022-05-24 12:28:43.401-05	17	5
9	2022-05-24 12:28:43.45-05	2022-05-24 12:28:43.45-05	2	3
10	2022-05-24 12:28:43.491-05	2022-05-24 12:28:43.491-05	12	5
11	2022-05-24 12:28:43.542-05	2022-05-24 12:28:43.542-05	1	10
12	2022-05-24 12:28:43.574-05	2022-05-24 12:28:43.574-05	10	1
13	2022-05-24 12:28:43.598-05	2022-05-24 12:28:43.598-05	10	10
14	2022-05-24 12:28:43.667-05	2022-05-24 12:28:43.667-05	2	10
15	2022-05-24 12:28:43.712-05	2022-05-24 12:28:43.712-05	3	5
16	2022-05-24 12:28:43.738-05	2022-05-24 12:28:43.738-05	14	1
17	2022-05-24 12:28:43.754-05	2022-05-24 12:28:43.754-05	5	2
18	2022-05-24 12:28:43.773-05	2022-05-24 12:28:43.773-05	1	7
19	2022-05-24 12:28:43.817-05	2022-05-24 12:28:43.817-05	18	4
20	2022-05-24 12:28:43.848-05	2022-05-24 12:28:43.848-05	1	5
21	2022-05-24 12:28:43.873-05	2022-05-24 12:28:43.873-05	8	8
22	2022-05-24 12:28:43.913-05	2022-05-24 12:28:43.913-05	4	9
\.


--
-- Data for Name: user_task_classrooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_task_classrooms (id, "createdAt", "updatedAt", "taskClassroomId", "userId", "createdBy") FROM stdin;
12	2022-05-24 15:46:12.255-05	2022-05-24 15:46:12.255-05	6	16	\N
15	2022-05-24 15:46:59.906-05	2022-05-24 15:46:59.906-05	2	14	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, names, "lastNames", dni, email, password, "birthDate", city, country, "lastLogin", "createdAt", "updatedAt", "roleId", "dniTypeId") FROM stdin;
1	Enmanuel Jose	Pereira Quijano	144302459	ejose.acc@gmail.com	$2b$10$Xt2U8dTvM6fTAhAdmAh7QebnysNGDdp3fucP084vGS.P5GTpJu3Fe	\N	\N	\N	\N	2022-05-24 12:00:38.788-05	2022-05-24 12:00:38.788-05	1	3
2	Katherine	Harmon	13234279	jennifermills@example.org	$2b$10$MdEndUe1n7vR/YZNS3yIg.M80AzMeNsEaNwH7Cq/DLoSSFmzJOIeO	2007-09-04 19:00:00-05	New Laura	Hungary	\N	2022-05-24 12:00:42.724-05	2022-05-24 12:00:42.724-05	1	3
3	Tracy	Hickman	29691903	rachel37@example.net	$2b$10$Dg7JtbsV4a6JK6i1DIeqdu9l0IBBGgSP/UKJOP5WN9l/AnBG.PnAm	2008-05-26 19:00:00-05	East Jennifer	Namibia	\N	2022-05-24 12:00:42.855-05	2022-05-24 12:00:42.855-05	2	3
4	Karla	Harper	45480552	denise74@example.com	$2b$10$VDrOObQ24ZPaNdeHYDgM6OFflmZB0667EnEkVINeJ21qWfI17bkGS	2007-11-04 19:00:00-05	Mollyside	Brunei Darussalam	\N	2022-05-24 12:00:42.999-05	2022-05-24 12:00:42.999-05	2	2
5	Jill	Chang	40640884	isteele@example.net	$2b$10$yh3CufNU.fJMNhu9WShRbethyjTvPbipqtLaShKJiv/g1xGCGYc1e	2006-10-12 19:00:00-05	Adamport	Central African Republic	\N	2022-05-24 12:00:43.155-05	2022-05-24 12:00:43.155-05	1	3
6	Brandon	Odonnell	84240514	pramirez@example.org	$2b$10$46dYDdkzeCYdfq9Lh9tMpuTfyGe0NNoj2lYAhphlUXR7vxgp/3S2W	2013-12-26 19:00:00-05	West Jefferystad	Sri Lanka	\N	2022-05-24 12:00:43.275-05	2022-05-24 12:00:43.275-05	3	3
7	Kayla	Short	6079721	blong@example.com	$2b$10$dIWBdwHr9/o6hOQ/1F6tEOrUL1nXkek/moKwuBkVw6iUZzDqoclo2	2003-09-27 19:00:00-05	Bradleyberg	Aruba	\N	2022-05-24 12:00:43.428-05	2022-05-24 12:00:43.428-05	2	1
8	Erin	Koch	50894663	johnsonbenjamin@example.net	$2b$10$cVO3/Aac0vtJ8t6RVWRVqOSbQbhgDKhTM1QlnA8D8hMZkA2pEq3tq	2010-08-19 19:00:00-05	New Patrick	Martinique	\N	2022-05-24 12:00:43.559-05	2022-05-24 12:00:43.559-05	1	2
9	Edward	Patel	8933738	daisy15@example.net	$2b$10$zS1UU3/1FLYqWSgCpZTIY.c.F6XUfkLza./8cTzdQvgZaAUktknK2	2008-06-12 19:00:00-05	Andresberg	Guadeloupe	\N	2022-05-24 12:00:43.753-05	2022-05-24 12:00:43.753-05	1	2
10	John	Mitchell	45809256	alyons@example.org	$2b$10$/MjIc0pIYFMrgB.AD9DbQu1tQ80nFHf.4paLNMt4fBXwcT8FWWdjK	2007-12-15 19:00:00-05	Port Derrickfort	Benin	\N	2022-05-24 12:00:43.885-05	2022-05-24 12:00:43.885-05	3	2
11	Kaylee	Fischer	73109283	nelsongregg@example.org	$2b$10$Pqj4xsjmJhxAXPsbjbpHp.U0OH8.nvfppkZDr1TbOfia2hwVtbkJe	2004-06-06 19:00:00-05	South Marymouth	Palestinian Territory	\N	2022-05-24 12:00:44.051-05	2022-05-24 12:00:44.051-05	2	1
12	Guy	Brown	66722255	noahtucker@example.com	$2b$10$mi4MH2HC1tLfRdE0EPgqlOe7eV0O7yiSmfS38mCVrQAzAdl1vQwRm	2010-05-07 19:00:00-05	East Reginaldberg	French Polynesia	\N	2022-05-24 12:00:57.84-05	2022-05-24 12:00:57.84-05	3	3
13	Jeremy	Palmer	37991453	amanda50@example.com	$2b$10$4GOnTZNa25MiUsMS7dFi2.Ai7IA52X.2Yv3qbgc189Bz/d3laAUOi	2007-01-01 19:00:00-05	Bennettshire	India	\N	2022-05-24 12:00:57.992-05	2022-05-24 12:00:57.992-05	3	3
14	Lisa	Stafford	14108642	melissabishop@example.org	$2b$10$H6ExvoEWSFosk2KRyaSJmu1KXnzipTn8SMhIG5.ox2z01TYVkRvMG	2010-01-23 19:00:00-05	South Debbie	Western Sahara	\N	2022-05-24 12:00:58.243-05	2022-05-24 12:00:58.243-05	3	3
15	Thomas	Freeman	68657584	david92@example.org	$2b$10$CVabmzyrs1O0wajc1Pt5g.3ka/w9T95KarCiocq/v1ZVVc1EMqYH6	2006-05-03 19:00:00-05	West Michelle	Lithuania	\N	2022-05-24 12:00:58.435-05	2022-05-24 12:00:58.435-05	3	2
16	Bruce	Webb	48426515	harrisoncolleen@example.net	$2b$10$wVDEWvUywBAVu/6mcF5EteszBVA0lcuvHDqv2M1T4FcIeWvqFurUG	2010-08-03 19:00:00-05	South Scottborough	Papua New Guinea	\N	2022-05-24 12:00:58.543-05	2022-05-24 12:00:58.543-05	3	1
17	Lisa	Stevens	31230967	amanda83@example.net	$2b$10$9mWHaee/jeTUnPXhyani2OU68L9ilsFacKvsx4lb3U49YjNVPu5FK	2008-05-31 19:00:00-05	Clarketown	Italy	\N	2022-05-24 12:00:58.634-05	2022-05-24 12:00:58.634-05	3	2
18	Joy	Harrell	67643484	jameshoward@example.org	$2b$10$7xXyp6B8NL6Kym1YpI59IOaa1OwKRG5NZQjhxqssCyHGK1GF0MEdS	2008-11-04 19:00:00-05	Castrofort	Nicaragua	\N	2022-05-24 12:00:58.765-05	2022-05-24 12:00:58.765-05	3	3
19	Jasmine	Johnson	16955198	janet21@example.net	$2b$10$VU02OULw9KRuCI7XmtWD/uXB.mBLzmusQgRy84sx2509sCrAq.obG	2006-01-13 19:00:00-05	West Eric	Mauritania	\N	2022-05-24 12:00:58.903-05	2022-05-24 12:00:58.903-05	3	2
20	Joan	Mcbride	88527418	rprice@example.com	$2b$10$z2IMx/OThPy5mUUOmwTto.t2OAcTNTEVq.5NoPnDzbZw4vrZ1CeZC	2008-05-11 19:00:00-05	Fergusontown	Tunisia	\N	2022-05-24 12:00:59.045-05	2022-05-24 12:00:59.045-05	3	3
21	Denise	Potter	22238016	martinezlauren@example.net	$2b$10$JX8l9FCxbyilvJgenAK6keSkaQMQFcAQXsjH8pPqPzeJ0kkHplb0.	2008-09-18 19:00:00-05	Gibsonville	Singapore	\N	2022-05-24 12:00:59.174-05	2022-05-24 12:00:59.174-05	3	3
22	Daniela	Puerta	10	daniela@gmail.com	$2b$10$6U314sKBiEsDJfZ/JBscSen1ojVcqhUetStGm3o5bFkPu/JX.ryzy	1990-10-23 19:00:00-05	Envigado - Antioquia	Colombia	\N	2022-05-25 17:06:22.182-05	2022-05-25 17:06:22.182-05	1	1
\.


--
-- Name: answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.answers_id_seq', 1, false);


--
-- Name: classrooms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.classrooms_id_seq', 13, true);


--
-- Name: dniTypes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."dniTypes_id_seq"', 3, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- Name: task_classrooms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.task_classrooms_id_seq', 9, true);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_id_seq', 10, true);


--
-- Name: user_classrooms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_classrooms_id_seq', 22, true);


--
-- Name: user_task_classrooms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_task_classrooms_id_seq', 19, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 22, true);


--
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);


--
-- Name: classrooms classrooms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classrooms
    ADD CONSTRAINT classrooms_pkey PRIMARY KEY (id);


--
-- Name: dniTypes dniTypes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."dniTypes"
    ADD CONSTRAINT "dniTypes_pkey" PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: task_classrooms task_classrooms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_classrooms
    ADD CONSTRAINT task_classrooms_pkey PRIMARY KEY (id);


--
-- Name: task_classrooms task_classrooms_taskId_classroomId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_classrooms
    ADD CONSTRAINT "task_classrooms_taskId_classroomId_key" UNIQUE ("taskId", "classroomId");


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: user_classrooms user_classrooms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_classrooms
    ADD CONSTRAINT user_classrooms_pkey PRIMARY KEY (id);


--
-- Name: user_classrooms user_classrooms_userId_classroomId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_classrooms
    ADD CONSTRAINT "user_classrooms_userId_classroomId_key" UNIQUE ("userId", "classroomId");


--
-- Name: user_task_classrooms user_task_classrooms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_task_classrooms
    ADD CONSTRAINT user_task_classrooms_pkey PRIMARY KEY (id);


--
-- Name: user_task_classrooms user_task_classrooms_taskClassroomId_userId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_task_classrooms
    ADD CONSTRAINT "user_task_classrooms_taskClassroomId_userId_key" UNIQUE ("taskClassroomId", "userId");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: answers answers_userTaskClassroomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT "answers_userTaskClassroomId_fkey" FOREIGN KEY ("userTaskClassroomId") REFERENCES public.user_task_classrooms(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: classrooms classrooms_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.classrooms
    ADD CONSTRAINT "classrooms_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: task_classrooms task_classrooms_classroomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_classrooms
    ADD CONSTRAINT "task_classrooms_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES public.classrooms(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: task_classrooms task_classrooms_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_classrooms
    ADD CONSTRAINT "task_classrooms_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: task_classrooms task_classrooms_taskId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_classrooms
    ADD CONSTRAINT "task_classrooms_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES public.tasks(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tasks tasks_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT "tasks_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: user_classrooms user_classrooms_classroomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_classrooms
    ADD CONSTRAINT "user_classrooms_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES public.classrooms(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_classrooms user_classrooms_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_classrooms
    ADD CONSTRAINT "user_classrooms_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_task_classrooms user_task_classrooms_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_task_classrooms
    ADD CONSTRAINT "user_task_classrooms_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: user_task_classrooms user_task_classrooms_taskClassroomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_task_classrooms
    ADD CONSTRAINT "user_task_classrooms_taskClassroomId_fkey" FOREIGN KEY ("taskClassroomId") REFERENCES public.task_classrooms(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_task_classrooms user_task_classrooms_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_task_classrooms
    ADD CONSTRAINT "user_task_classrooms_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users users_dniTypeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_dniTypeId_fkey" FOREIGN KEY ("dniTypeId") REFERENCES public."dniTypes"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: users users_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

